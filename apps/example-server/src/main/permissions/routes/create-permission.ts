import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { create } from '../permissions.service'
import { zInsertPermission, zSelectPermission } from '../permissions.schema'

export const createPermissionRoute = createRoute({
    path: '/v1/permissions',
    method: 'post',
    tags: ['Permissions'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zInsertPermission, 'Permissions details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            zSelectPermission,

            'Permissions created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid permissions data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createPermissionHandler: AppRouteHandler<
    typeof createPermissionRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const permission = await create(body)
        return c.json(
            jsonResponse(
                permission,
                'Permission created successfully',
                CREATED,
            ),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Bad request',
                    success: false,
                    error: error.errors,
                },
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
