import { createRouter } from '../../core/create-app'
import { addUserToGroupHandler, addUserToGroupRoute } from './routes/add-user-to-group'
import { createGroupHandler, createGroupRoute } from './routes/create-group'
import {
    deleteGroupByIdRoute,
    deleteGroupHandler,
} from './routes/delete-group-by-Id'
import { getGroupByIdHandler, getGroupByIDRoute } from './routes/get-group-by-id'
import { getGroupsHandler, getGroupsRoute } from './routes/get-groups'
import { leaveGroupHandler, leaveGroupRoute } from './routes/leave-group'
import {
    removeUserFromGroupHandler,
    removeUserFromGroupRoute,
} from './routes/remove-user-from-group'
import {
    updateGroupByIdRoute,
    updateGroupHandler,
} from './routes/update-group-by-id'
import {
    updateUserRoleHandler,
    updateUserRoleRoute,
} from './routes/update-user-role'

export const groupsV1Route = createRouter()
    .openapi(getGroupsRoute, getGroupsHandler)
    .openapi(createGroupRoute, createGroupHandler)
    .openapi(getGroupByIDRoute, getGroupByIdHandler)
    .openapi(updateGroupByIdRoute, updateGroupHandler)
    .openapi(deleteGroupByIdRoute, deleteGroupHandler)
    .openapi(addUserToGroupRoute, addUserToGroupHandler)
    .openapi(updateUserRoleRoute, updateUserRoleHandler)
    .openapi(removeUserFromGroupRoute, removeUserFromGroupHandler)
    .openapi(leaveGroupRoute, leaveGroupHandler)
