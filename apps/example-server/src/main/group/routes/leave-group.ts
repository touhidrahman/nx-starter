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
import { isGroupParticipant } from '../../../core/middlewares/is-group-owner.middleware'
import { deleteUser, findUserByUserIdAndGroupId } from '../../user/user.service'

export const leaveGroupRoute = createRoute({
    path: '/v1/group/:id/leave',
    method: 'delete',
    tags: ['Group'],
    middleware: [checkToken, isGroupParticipant] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [CREATED]: ApiResponse(
            zSelectUser,
            'User deleted from group successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
    },
})
export const leaveGroupHandler: AppRouteHandler<
    typeof leaveGroupRoute
> = async (c) => {
    const id = c.req.param('id')
    const { userId } = await c.get('jwtPayload')

    const user = await findUserByUserIdAndGroupId(userId, id)
    if (!user) {
        return c.json(
            {
                message: 'User does not belong to group',
                data: {},
                success: false,
            },
            BAD_REQUEST,
        )
    }

    const [result] = await deleteUser(user.id)
    // update auth user group if set
    // const authUser = await findAuthUserByUserId(user.id)
    // if (authUser?.defaultGroupId === id) {
    //     await setDefaultGroupId(authUser.id, null)
    // }

    return c.json(
        { data: result, message: 'User removed from group', success: true },
        CREATED,
    )
}
