import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser, zUpdateUser } from '../user.schema'
import { updateUser } from '../user.service'
import { passwordRemoved } from '../user.util'

export const updateUserRoute = createRoute({
    path: '/v1/user/:id',
    method: 'put',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateUser, 'User details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectUser, 'Updated'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const updateUserHandler: AppRouteHandler<
    typeof updateUserRoute
> = async (c) => {
    const body = c.req.valid('json')
    const userId = c.req.param('id')
    const [updatedUser] = await updateUser(userId, body)

    if (!updatedUser) {
        return c.json(
            { data: {}, message: 'User not found', success: false },
            NOT_FOUND,
        )
    }
    return c.json(
        {
            data: passwordRemoved(updatedUser),
            message: 'User updated',
            success: true,
        },
        OK,
    )
}
