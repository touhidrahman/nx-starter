import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { applicationAreasTable } from '../../core/db/schema'
import { isAdmin } from '../../core/middlewares/is-admin.middleware'
import {
    zInsertApplicationArea,
    zUpdateApplicationArea,
} from './application-areas.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// List all application areas
app.get('/application-areas', authMiddleware, isAdmin, async (c) => {
    const applicationAreas = await db
        .select({ ...getTableColumns(applicationAreasTable) })
        .from(applicationAreasTable)

    return c.json({
        data: applicationAreas,
        message: 'Application areas listed',
    })
})

// Find one application area by ID
app.get('/application-areas/:id', authMiddleware, isAdmin, async (c) => {
    const areaId = parseInt(c.req.param('id'), 10)

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
app.post('/application-areas', authMiddleware, isAdmin, async (c) => {
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
app.put('/application-areas/:id', authMiddleware, isAdmin, async (c) => {
    const body = await c.req.json()
    const parsedBody = zUpdateApplicationArea.parse(body)
    const areaId = parseInt(c.req.param('id'), 10)

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
app.delete('/application-areas/:id', authMiddleware, isAdmin, async (c) => {
    const areaId = parseInt(c.req.param('id'), 10)

    await db
        .delete(applicationAreasTable)
        .where(eq(applicationAreasTable.id, areaId))

    return c.json({ message: 'Application area deleted' })
})

export default app
