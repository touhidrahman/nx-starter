import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../core/db/db'
import { applicationAreasTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import { isAdmin } from '../../core/middlewares/is-admin.middleware'
import {
    zInsertApplicationArea,
    zUpdateApplicationArea,
} from './application-areas.schema'

const app = new Hono()

// List all application areas
app.get('', authMiddleware, isAdmin, async (c) => {
    const applicationAreas = await db
        .select({ ...getTableColumns(applicationAreasTable) })
        .from(applicationAreasTable)

    return c.json({
        data: applicationAreas,
        message: 'Application areas listed',
    })
})

// Find one application area by ID
app.get('/:id', authMiddleware, isAdmin, async (c) => {
    const areaId = c.req.param('id')

    const applicationAreas = await db
        .select({ ...getTableColumns(applicationAreasTable) })
        .from(applicationAreasTable)
        .where(eq(applicationAreasTable.id, areaId))
        .limit(1)

    if (applicationAreas.length === 0) {
        return c.json({ message: 'Application area not found' }, 404)
    }

    return c.json({
        data: applicationAreas[0],
        message: 'Application area found',
    })
})

// Create a new application area
app.post('', authMiddleware, isAdmin, async (c) => {
    const body = await c.req.json()
    const parsedBody = zInsertApplicationArea.parse(body)

    const newApplicationArea = await db
        .insert(applicationAreasTable)
        .values(parsedBody)
        .returning()

    return c.json({
        data: newApplicationArea,
        message: 'Application area created',
    })
})

// Update an application area
app.put('/:id', authMiddleware, isAdmin, async (c) => {
    const body = await c.req.json()
    const parsedBody = zUpdateApplicationArea.parse(body)
    const areaId = c.req.param('id')

    const updatedApplicationArea = await db
        .update(applicationAreasTable)
        .set(parsedBody)
        .where(eq(applicationAreasTable.id, areaId))
        .returning()

    return c.json({
        data: updatedApplicationArea,
        message: 'Application area updated',
    })
})

// Delete an application area
app.delete('/:id', authMiddleware, isAdmin, async (c) => {
    const areaId = c.req.param('id')

    await db
        .delete(applicationAreasTable)
        .where(eq(applicationAreasTable.id, areaId))

    return c.json({ message: 'Application area deleted' })
})

export default app
