import { createRoute } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUserById } from '../user.service'
import { passwordRemoved } from '../user.util'

export const getMeRoute = createRoute({
    path: '/v1/me',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken] as const,
    responses: {
        [OK]: ApiResponse(zSelectUser, 'Logged in user profile'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const getMeHandler: AppRouteHandler<typeof getMeRoute> = async (c) => {
    const payload = c.get('jwtPayload')
    const user = await findUserById(payload.sub)
    if (!user) {
        return c.json(
            { data: {}, success: false, message: 'User not found' },
            NOT_FOUND,
        )
    }

    return c.json(
        { data: passwordRemoved(user), success: true, message: 'User found' },
        OK,
    )
}
