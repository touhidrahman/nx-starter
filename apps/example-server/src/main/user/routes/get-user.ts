import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUserById } from '../user.service'
import { passwordRemoved } from '../user.util'

export const getUserRoute = createRoute({
    path: '/v1/user/:id',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectUser, 'User found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const getUserHandler: AppRouteHandler<typeof getUserRoute> = async (
    c,
) => {
    const userId = c.req.param('id')
    const user = await findUserById(userId)

    if (!user) {
        return c.json(
            { data: {}, message: 'User not found', success: false },
            NOT_FOUND,
        )
    }

    return c.json(
        { data: passwordRemoved(user), message: 'User found', success: true },
        OK,
    )
}
