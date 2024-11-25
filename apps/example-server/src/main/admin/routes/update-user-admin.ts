import { createRoute, z } from '@hono/zod-openapi'
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { makeUserAdmin } from '../admin-user.service'

export const updateAdminUserRoute = createRoute({
    path: '/v1/admin-users/promote',
    method: 'put',
    tags: ['AdminUser'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(z.object({ userId: z.string() }), 'Admin user ID'),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'User promoted to admin'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updateAdminUserHandler: AppRouteHandler<
    typeof updateAdminUserRoute
> = async (c) => {
    const { userId } = c.req.valid('json')

    try {
        const response = await makeUserAdmin(userId)

        if (response.code === 404) {
            return c.json(
                { data: {}, message: response.message, success: false },
                NOT_FOUND,
            )
        }

        return c.json(
            { data: {}, success: true, message: response.message },
            OK,
        )
    } catch (error) {
        console.error(
            'Error promoting user to admin:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            {
                data: {},
                message: 'Failed to promote user to admin',
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
