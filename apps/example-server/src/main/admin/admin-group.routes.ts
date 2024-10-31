import { createRouter } from '../../core/create-app'
import { createAdminGroupHandler, createAdminGroupRoute,  } from './routes/create-admin-group'
import { deleteAdminGroupHandler, deleteAdminGroupRoute } from './routes/delete-admin-group'
import { getAdminGroupHandler, getAdminGroupRoute } from './routes/get-admin-group'
import { getAdminGroupsHandler, getAdminGroupsRoute } from './routes/get-admin-groups'
import { updateAdminGroupHandler, updateAdminGroupRoute } from './routes/update-admin-group'

export const adminGroupV1Routes = createRouter()
    .openapi(createAdminGroupRoute, createAdminGroupHandler)
    .openapi(getAdminGroupRoute, getAdminGroupHandler)
    .openapi(getAdminGroupsRoute, getAdminGroupsHandler)
    .openapi(updateAdminGroupRoute, updateAdminGroupHandler)
    .openapi(deleteAdminGroupRoute, deleteAdminGroupHandler)
