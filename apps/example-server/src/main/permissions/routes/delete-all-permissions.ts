import { createRoute, z } from '@hono/zod-openapi'
import { OK, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zDeletePermission } from '../permissions.schema'
import { deleteMany } from '../permissions.service'
import { jsonContent } from 'stoker/openapi/helpers'

export const deleteAllPermissionsRoute = createRoute({
    path: '/v1/permissions',
    method: 'delete',
    tags: ['Permissions'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zDeletePermission, 'Permissions details'),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Permissions deleted successfully',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const deleteAllPermissionsHandler: AppRouteHandler<
    typeof deleteAllPermissionsRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        for (const permission of body.permissions) {
            await deleteMany(permission)
        }

        return c.json(
            jsonResponse('', 'Permissions deleted successfully', OK),
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting permissions:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to delete permissions',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}