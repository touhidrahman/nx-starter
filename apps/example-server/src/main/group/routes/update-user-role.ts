import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zUpdateUserRole } from '../group.schema'
import {
    findUserByUserIdAndGroupId,
    updateUser,
    userExists,
} from '../../user/user.service'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { zSelectUser } from '../../user/user.schema'

export const updateUserRoleRoute = createRoute({
    path: '/v1/groups/:id/update-user-role',
    method: 'post',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateUserRole, 'User ID and Role'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectUser, 'User Role updated successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})
export const updateUserRoleHandler: AppRouteHandler<
    typeof updateUserRoleRoute
> = async (c) => {
    const id = c.req.param('id')
    const { userId, role } = c.req.valid('json')

    try {
        const exists = await userExists(userId)
        if (!exists) {
            return c.json(
                { message: 'User not found', data: {}, success: false },
                NOT_FOUND,
            )
        }
        const user = await findUserByUserIdAndGroupId(userId, id)
        if (!user) {
            return c.json(
                {
                    data: {},
                    success: false,
                    message: 'User does not belong to group',
                },
                BAD_REQUEST,
            )
        }

        const [result] = await updateUser(user.id, { role: role as any })

        return c.json(
            { data: result, message: 'User role updated', success: true },
            CREATED,
        )
    } catch (error) {
        return c.json(
            {
                message: 'Error adding user to group',
                error,
                data: {},
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
