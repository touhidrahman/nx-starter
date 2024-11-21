import { createRouter } from '../../core/create-app'
import {
    createPermissionHandler,
    createPermissionRoute,
} from './routes/create-permission'
import {
    deleteAllPermissionsHandler,
    deleteAllPermissionsRoute,
} from './routes/delete-all-permissions'
import {
    getPermissionListHandler,
    getPermissionListRoute,
} from './routes/get-permission-list'

export const permissionsV1Route = createRouter()
// .openapi(createPermissionRoute, createPermissionHandler)
// .openapi(deleteAllPermissionsRoute, deleteAllPermissionsHandler)
// .openapi(getPermissionListRoute, getPermissionListHandler)
