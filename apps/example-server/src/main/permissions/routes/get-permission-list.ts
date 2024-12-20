import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectPermission } from '../permissions.schema'
import { listAll } from '../permissions.service'

export const getPermissionListRoute = createRoute({
    path: '/v1/permissions',
    tags: ['Permissions'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectPermission), 'List of permissions'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No permissions found!'),
    },
})

export const getPermissionListHandler: AppRouteHandler<
    typeof getPermissionListRoute
> = async (c) => {
    try {
        const permissions = await listAll()

        return c.json(
            { data: permissions, message: 'Permissions list', success: true },
            OK,
        )
    } catch (error: any) {
        return c.json(
            {
                error: 'Internal server error',
                message: error.message,
                data: {},
                success: false,
            },
            NOT_FOUND,
        )
    }
}
