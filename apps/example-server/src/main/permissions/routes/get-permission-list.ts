import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectPermission } from '../permissions.schema'
import { listAll } from '../permissions.service'

export const getPermissionListRoute = createRoute({
    path: '/v1/permissions',
    tags: ['Permissions'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectPermission),

            'List of permissions',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No permissions found!'),
    },
})

export const getPermissionListHandler: AppRouteHandler<
    typeof getPermissionListRoute
> = async (c) => {
    try {
        const permissions = await listAll()

        return c.json({ data: permissions, message: 'Permissions list' }, OK)
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            NOT_FOUND,
        )
    }
}
