import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser, zUpdateUser } from '../user.schema'
import { updateUser } from '../user.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const updateUserRoute = createRoute({
    path: '/v1/user/:id',
    method: 'put',
    tags: ['User'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateUser, 'User details'),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: zSelectUser,
                message: z.string(),
                error: z.any(),
                success: z.boolean(),
            },
            'Updated',
        ),
        [NOT_FOUND]: ApiResponse(
            {
                data: zEmpty,
                message: z.string(),
                error: z.any(),
                success: z.boolean(),
            },
            'User not found',
        ),
    },
})

export const updateUserHandler: AppRouteHandler<
    typeof updateUserRoute
> = async (c) => {
    const body = c.req.valid('json')
    const userId = c.req.param('id')
    const [updatedUser] = await updateUser(userId, body)

    if (!updatedUser) {
        return c.json(jsonResponse({}, 'Task not found', NOT_FOUND), NOT_FOUND)
    }
    return c.json(
        jsonResponse(updatedUser, 'Task not found', NOT_FOUND),
        NOT_FOUND,
    )
}
