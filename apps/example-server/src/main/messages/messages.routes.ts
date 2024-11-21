import { createRouter } from '../../core/create-app'
import {
    updateMessageHandler,
    updateMessageRoute,
} from './routes/update-message'
import {
    createMessageRoute,
    createMessageHandler,
} from './routes/create-message'
import { getMessageRoute, getMessageHandler } from './routes/get-message'
import {
    deleteMessageHandler,
    deleteMessageRoute,
} from './routes/delete-message'
import {
    deleteAllMessagesHandler,
    deleteAllMessagesRoute,
} from './routes/delete-all-messages'
import {
    getMessageListHandler,
    getMessageListRoute,
} from './routes/get-message-list'

export const messagesV1Route = createRouter()
// .openapi(updateMessageRoute, updateMessageHandler)
// .openapi(createMessageRoute, createMessageHandler)
// .openapi(getMessageRoute, getMessageHandler)
// .openapi(getMessageListRoute, getMessageListHandler)
// .openapi(deleteMessageRoute, deleteMessageHandler)
// .openapi(deleteAllMessagesRoute, deleteAllMessagesHandler)
