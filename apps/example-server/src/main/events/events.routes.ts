import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { eventsTable } from '../../core/db/schema'
import { zDeleteEvent, zInsertEvent, zUpdateEvent } from './events.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /events - list all
app.get('', authMiddleware, async (c) => {
    const events = await db
        .select({ ...getTableColumns(eventsTable) })
        .from(eventsTable)
        .limit(100)

    return c.json({ data: events, message: 'Events list' })
})

// GET /events/:id - find one
app.get('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const event = await db
        .select({ ...getTableColumns(eventsTable) })
        .from(eventsTable)
        .where(eq(eventsTable.id, id))
        .limit(1)

    if (event.length === 0) {
        return c.json({ message: 'Event not found' }, 404)
    }

    return c.json({ data: event[0], message: 'Event found' })
})

// POST /events - create one
app.post('', zValidator('json', zInsertEvent), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newEvent = await db.insert(eventsTable).values(body).returning()

    return c.json({ data: newEvent, message: 'Event created' })
})

// PATCH /events/:id - update
app.patch(
    '/:id',
    zValidator('json', zUpdateEvent),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedEvent = await db
            .update(eventsTable)
            .set(body)
            .where(eq(eventsTable.id, id))
            .returning()

        return c.json({ data: updatedEvent, message: 'Event updated' })
    },
)

// DELETE /events/:id - delete
app.delete('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(eventsTable).where(eq(eventsTable.id, id))

    return c.json({ message: 'Event deleted' })
})

// DELETE /events - delete many
app.delete('', zValidator('json', zDeleteEvent), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    for (const eventId of body.eventIds) {
        await db.delete(eventsTable).where(eq(eventsTable.id, eventId))
    }

    return c.json({ message: 'Events deleted' })
})

export default app
