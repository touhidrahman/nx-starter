import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUserById } from '../user.service'

export const getUserRoute = createRoute({
    path: '/v1/user/:id',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectUser, message: z.string(), success: z.boolean() },
            'User found',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'User not found',
        ),
    },
})

export const getUserHandler: AppRouteHandler<typeof getUserRoute> = async (
    c,
) => {
    const userId = c.req.param('id')
    const user = await findUserById(userId)

    if (!user) {
        return c.json(jsonResponse({}, 'User not found', NOT_FOUND), NOT_FOUND)
    }

    return c.json(jsonResponse(user, 'User found', OK), OK)
}
