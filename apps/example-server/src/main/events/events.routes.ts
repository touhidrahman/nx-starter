export const eventV1Route = createRouter()
    .openapi(getEventsRoute, getEventsHandler)
    .openapi(getEventRoute, getEventHandler)
    .openapi(createEventRoute, createEventHandler)
    .openapi(updateEventRoute, updateEventHandler)
    .openapi(deleteEventRoute, deleteEventHandler)
    .openapi(deleteManyEventRoute, deleteManyEventHandler)

import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { eventsTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkEventOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import { zId, zIds } from '../../core/models/common.schema'
import { zUpdateEvent } from './events.schema'
import {
    createEvent,
    deleteEvent,
    deleteManyEvent,
    getAnEvent,
    getEventsList,
    updateEvent,
} from './events.service'
import { createRouter } from '../../core/create-app'
import { getEventsHandler, getEventsRoute } from './routes/get-all-events'
import { getEventHandler, getEventRoute } from './routes/get-event'
import { createEventHandler, createEventRoute } from './routes/create-event'
import { updateEventRoute, updateEventHandler } from './routes/update-event'
import { deleteEventRoute, deleteEventHandler } from './routes/delete-event'
import {
    deleteManyEventRoute,
    deleteManyEventHandler,
} from './routes/delete-many'

const app = new Hono()

// DELETE /events - delete many
app.delete('', zValidator('json', zIds), authMiddleware, async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        for (const eventId of body.ids) {
            await deleteManyEvent(eventId, payload.groupId)
        }
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }

    return c.json({ message: 'Events deleted' })
})
