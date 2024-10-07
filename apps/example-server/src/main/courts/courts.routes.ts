import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../core/db/db'
import { courtsTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import { zInsertCourt, zUpdateCourt } from './courts.schema'
import { zIds } from '../../core/models/common.schema'

const app = new Hono()

// GET /courts - list all
app.get('', authMiddleware, async (c) => {
    const courts = await db
        .select({ ...getTableColumns(courtsTable) })
        .from(courtsTable)
        .limit(100)
    return c.json({ data: courts, message: 'Courts list' })
})

// GET /courts/:id - find one
app.get('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const court = await db
        .select({ ...getTableColumns(courtsTable) })
        .from(courtsTable)
        .where(eq(courtsTable.id, id))
        .limit(1)

    if (court.length === 0) {
        return c.json({ message: 'Court not found' }, 404)
    }

    return c.json({ data: court[0], message: 'Court found' })
})

// POST /courts - create one
app.post('', zValidator('json', zInsertCourt), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newCourt = await db.insert(courtsTable).values(body).returning()

    return c.json({ data: newCourt, message: 'Court created' })
})

// PATCH /courts/:id - update
app.patch(
    '/courts/:id',
    zValidator('json', zUpdateCourt),
    authMiddleware,
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')

        const updatedCourt = await db
            .update(courtsTable)
            .set(body)
            .where(eq(courtsTable.id, id))
            .returning()

        return c.json({ data: updatedCourt, message: 'Court updated' })
    },
)

// DELETE /courts/:id - delete
app.delete('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')

    await db.delete(courtsTable).where(eq(courtsTable.id, id))

    return c.json({ message: 'Court deleted' })
})

// DELETE /courts - delete many
app.delete('', zValidator('json', zIds), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    for (const courtId of body.ids) {
        await db.delete(courtsTable).where(eq(courtsTable.id, courtId))
    }

    return c.json({ message: 'Court entries deleted' })
})

export default app
