import { createRoute } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUserByAuthUserIdAndGroupId } from '../user.service'

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

export const getMeHandler: AppRouteHandler<typeof getMeRoute> = async (c) => {
    const payload = c.get('jwtPayload')
    const user = await findUserByAuthUserIdAndGroupId(
        payload.sub,
        payload.groupId,
    )

    if (!user) {
        return c.json({ message: 'User not found', data: {} }, NOT_FOUND)
    }

    return c.json({ data: user, message: 'Logged in user' }, OK)
}
