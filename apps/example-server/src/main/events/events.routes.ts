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

export const eventV1Route = createRouter()
// .openapi(getEventsRoute, getEventsHandler)
// .openapi(getEventRoute, getEventHandler)
// .openapi(createEventRoute, createEventHandler)
// .openapi(updateEventRoute, updateEventHandler)
// .openapi(deleteEventRoute, deleteEventHandler)
// .openapi(deleteManyEventRoute, deleteManyEventHandler)
