import { createRoute, z } from '@hono/zod-openapi'
import { NO_CONTENT, NOT_FOUND } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { deleteUser } from '../user.service'

export const deleteUserRoute = createRoute({
    path: '/v1/user/:id',
    method: 'delete',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [NO_CONTENT]: ApiResponse(zSelectUser, 'Deleted'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const deleteUserHandler: AppRouteHandler<typeof deleteUserRoute> = async (c) => {
    const userId = c.req.param('id')
    const [user] = await deleteUser(userId)

    if (!user) {
        return c.json(
            { data: {}, success: false, message: 'User not found' },
            NOT_FOUND,
        )
    }

    return c.json(
        { data: user, success: true, message: 'User deleted' },
        NOT_FOUND,
    )
}
