import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { toInt } from 'radash'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { eventsTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkEventOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import { zDeleteEvent, zInsertEvent, zUpdateEvent } from './events.schema'

const app = new Hono()

// GET /events - list all
app.get('', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = toInt(payload.groupId)
        const events = await db
            .select({ ...getTableColumns(eventsTable) })
            .from(eventsTable)
            .where(eq(eventsTable.groupId, groupId))
            .limit(100)

        return c.json({ data: events, message: 'Events list' })
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }
})

// GET /events/:id - find one
app.get(
    '/:id',
    authMiddleware,
    zValidator('param', z.object({ id: z.coerce.number() })),
    checkEventOwnershipMiddleware(eventsTable, 'Event'),
    async (c) => {
        const id = c.req.param('id')
        const event = await db
            .select({ ...getTableColumns(eventsTable) })
            .from(eventsTable)
            .where(eq(eventsTable.id, id))
            .limit(1)

        if (event.length === 0) {
            return c.json({ message: 'Event not found' }, 404)
        }

        return c.json({ data: event[0], message: 'Event found' })
    },
)

// POST /events - create one
app.post('', zValidator('json', zInsertEvent), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newEvent = await db.insert(eventsTable).values(body).returning()

    return c.json({ data: newEvent, message: 'Event created' })
})

// PATCH /events/:id - update
app.patch(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator('json', zUpdateEvent),
    authMiddleware,
    checkEventOwnershipMiddleware(eventsTable, 'Event'),
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedEvent = await db
            .update(eventsTable)
            .set(body)
            .where(
                and(
                    eq(eventsTable.id, id),
                    eq(eventsTable.groupId, payload.groupId),
                ),
            )
            .returning()

        return c.json({ data: updatedEvent, message: 'Event updated' })
    },
)

// DELETE /events/:id - delete
app.delete(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    authMiddleware,
    checkEventOwnershipMiddleware(eventsTable, 'Event'),
    async (c) => {
        const id = c.req.param('id')

        await db.delete(eventsTable).where(eq(eventsTable.id, id))

        return c.json({ message: 'Event deleted' })
    },
)

// DELETE /events - delete many
app.delete('', zValidator('json', zDeleteEvent), authMiddleware, async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        for (const eventId of body.eventIds) {
            await db
                .delete(eventsTable)
                .where(
                    and(
                        eq(eventsTable.id, eventId),
                        eq(eventsTable.groupId, payload.groupId),
                    ),
                )
        }
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }

    return c.json({ message: 'Events deleted' })
})

export default app
