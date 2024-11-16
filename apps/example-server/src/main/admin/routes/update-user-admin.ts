import { createRoute, z } from '@hono/zod-openapi'
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { makeUserAdmin } from '../admin-user.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const updateAdminUserRoute = createRoute({
    path: '/v1/admin-users/promote',
    method: 'put',
    tags: ['AdminUser'],
    middleware: [checkToken],
    request: {
        body: jsonContent(z.object({ userId: z.string() }), 'Admin user ID'),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'User promoted to admin',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'User not found',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
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
                jsonResponse({}, response.message, NOT_FOUND),
                NOT_FOUND,
            )
        }

        return c.json(jsonResponse({}, response.message, OK), OK)
    } catch (error) {
        console.error(
            'Error promoting user to admin:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to promote user to admin',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
