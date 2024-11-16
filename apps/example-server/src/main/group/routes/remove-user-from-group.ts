import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../../user/user.schema'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { deleteUser, findUserByUserIdAndGroupId } from '../../user/user.service'

export const removeUserFromGroupRoute = createRoute({
    path: '/v1/group/:id/remove-user/:userId',
    method: 'delete',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner],
    request: {
        params: z.object({ id: z.string(), userId: z.string() }),
    },
    responses: {
        [CREATED]: ApiResponse(
            { data: zSelectUser, message: z.string(), success: z.boolean() },
            'User deleted from group successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid group data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})
export const removeUserFromGroupHandler: AppRouteHandler<
    typeof removeUserFromGroupRoute
> = async (c: any) => {
    const id = c.req.param('id')
    const userId = c.req.param('userId')

    const user = await findUserByUserIdAndGroupId(userId, id)
    if (!user) {
        return c.json({ error: 'User does not belong to group' }, 400)
    }

    const result = await deleteUser(user.id)
    // update auth user group if set
    // const authUser = await findAuthUserByUserId(user.id)
    // if (authUser?.defaultGroupId === id) {
    //     await setDefaultGroupId(authUser.id, null)
    // }

    return c.json({ data: result, message: 'User removed from group' }, 201)
}
