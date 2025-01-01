import { createRouter } from '../../core/create-app'
import { getGroupsHandler, getGroupsRoute } from './routes/get-groups'
import { createGroupRoute, createGroupHandler } from './routes/create-group'
import { getGroupByIdHandler, getGroupByIDRoute } from './routes/get-groupById'
import {
    updateGroupByIdRoute,
    updateGroupHandler,
} from './routes/update-groupById'
import {
    addAuthUserToGroupHandler,
    addAuthUserToGroupRoute,
} from './routes/add-auth-userToGroup'
import {
    updateUserRoleHandler,
    updateUserRoleRoute,
} from './routes/update-user-role'
import {
    removeUserFromGroupHandler,
    removeUserFromGroupRoute,
} from './routes/remove-user-from-group'
import { leaveGroupHandler, leaveGroupRoute } from './routes/leave-group'
import {
    deleteGroupByIdRoute,
    deleteGroupHandler,
} from './routes/delete-groupById'

export const groupsV1Route = createRouter()
    .openapi(getGroupsRoute, getGroupsHandler)
    .openapi(createGroupRoute, createGroupHandler)
    .openapi(getGroupByIDRoute, getGroupByIdHandler)
    .openapi(updateGroupByIdRoute, updateGroupHandler)
    .openapi(deleteGroupByIdRoute, deleteGroupHandler)
    .openapi(addAuthUserToGroupRoute, addAuthUserToGroupHandler)
    .openapi(updateUserRoleRoute, updateUserRoleHandler)
    .openapi(removeUserFromGroupRoute, removeUserFromGroupHandler)
    .openapi(leaveGroupRoute, leaveGroupHandler)
