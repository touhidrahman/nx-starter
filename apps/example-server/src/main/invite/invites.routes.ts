import { createRouter } from '../../core/create-app'
import { createInviteHandler, createInviteRoute } from './routes/create-invite'

export const invitesV1Route = createRouter().openapi(
    createInviteRoute,
    createInviteHandler,
)
