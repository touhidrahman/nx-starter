import { createRoute, OpenAPIHono, RouteHandler, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppBindings, AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUserByAuthUserIdAndGroupId } from '../user.service'
import { Context } from 'hono'

export const getMeRoute = createRoute({
    path: '/v1/me',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken],
    responses: {
        [OK]: ApiResponse(zSelectUser, 'Logged in user profile'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

type GetMeRoute = typeof getMeRoute
export const getMeHandler: RouteHandler<GetMeRoute, AppBindings> = async (
    c,
) => {
    const payload = c.get('jwtPayload')
    const user = await findUserByAuthUserIdAndGroupId(
        payload.sub,
        payload.groupId,
    )

    if (!user) {
        return c.json(
            { data: {}, success: false, message: 'User not found' },
            NOT_FOUND,
        )
    }

    return c.json({ data: user, success: true, message: 'User found' }, OK)
}
