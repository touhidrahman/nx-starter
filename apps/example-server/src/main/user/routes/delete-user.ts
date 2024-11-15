import { createRoute, z } from '@hono/zod-openapi'
import { NO_CONTENT, NOT_FOUND } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { deleteUser } from '../user.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const deleteUserRoute = createRoute({
    path: '/v1/user/:id',
    method: 'delete',
    tags: ['User'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [NO_CONTENT]: ApiResponse(
            { data: zSelectUser, message: z.string(), success: z.boolean() },
            'Deleted',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'User not found',
        ),
    },
})

export const deleteUserHandler: AppRouteHandler<
    typeof deleteUserRoute
> = async (c) => {
    const userId = c.req.param('id')
    const [user] = await deleteUser(userId)

    if (!user) {
        return c.json(jsonResponse({}, 'User not found', NOT_FOUND), NOT_FOUND)
    }

    return c.json(jsonResponse(user, 'User deleted', NO_CONTENT), NO_CONTENT)
}
