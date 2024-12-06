import { createRoute } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty, zId } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zAuthUserSelect } from '../auth.schema'
import { setDefaultGroupId } from '../auth.service'

export const setDefaulGroupRoute = createRoute({
    path: '/v1/user/:id',
    tags: ['User'],
    method: 'post',
    middleware: [checkToken] as const,
    request: {
        params: zId,
    },
    responses: {
        [OK]: ApiResponse(zAuthUserSelect, 'Auth user detail'),
        [NOT_FOUND]: ApiResponse(zEmpty, ' not found!'),
    },
})

export const setDefaultGroupHandler: AppRouteHandler<
    typeof setDefaulGroupRoute
> = async (c) => {
    const authUserId = c.req.param('id')
    const { groupId } = await c.get('jwtPayload')

    const defaultAuthUser = await setDefaultGroupId(authUserId, groupId)

    if (!defaultAuthUser) {
        return c.json(
            { data: {}, message: 'something went wrong', success: false },
            NOT_FOUND,
        )
    }

    return c.json(
        {
            data: defaultAuthUser,
            message: 'Set default auth user',
            success: true,
        },
        OK,
    )
}
