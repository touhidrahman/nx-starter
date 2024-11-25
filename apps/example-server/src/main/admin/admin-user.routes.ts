import { createRouter } from '../../core/create-app'
import {
    approveAdminUserHandler,
    approveAdminUserRoute,
} from './routes/create-admin-user'
import { getAdminUserHandler, getAdminUserRoute } from './routes/get-admin-user'
import {
    getAdminUsersHandler,
    getAdminUsersRoute,
} from './routes/get-admin-users'
import {
    updateAdminUserHandler,
    updateAdminUserRoute,
} from './routes/update-user-admin'

export const adminUserV1Routes = createRouter()
    .openapi(approveAdminUserRoute, approveAdminUserHandler)
    .openapi(getAdminUserRoute, getAdminUserHandler)
    .openapi(getAdminUsersRoute, getAdminUsersHandler)
    .openapi(updateAdminUserRoute, updateAdminUserHandler)
