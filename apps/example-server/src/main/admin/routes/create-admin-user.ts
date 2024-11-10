import { createRoute, z } from '@hono/zod-openapi'
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { approveAdminUser } from '../admin-user.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const approveAdminUserRoute = createRoute({
    path: '/v1/admin-users/approve',
    method: 'post',
    tags: ['AdminUser'],
    middleware: [checkToken],
    request: {
        body: jsonContent(
            z.object({ userId: z.string().nonempty() }),
            'Admin user ID',
        ),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Admin account approved'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found or already approved'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const approveAdminUserHandler: AppRouteHandler<
    typeof approveAdminUserRoute
> = async (c) => {
    const { userId } = c.req.valid('json')

    try {
        const response = await approveAdminUser(userId)

        if (response.code === 404) {
            return c.json(
                jsonResponse({}, response.message, NOT_FOUND),
                NOT_FOUND,
            )
        }

        return c.json(jsonResponse({}, response.message, OK), OK)
    } catch (error) {
        console.error(
            'Error approving admin user:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to approve admin user',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
