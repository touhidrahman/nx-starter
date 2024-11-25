import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteGroup, findGroupById } from '../admin-groups.service'

export const deleteAdminGroupRoute = createRoute({
    path: '/v1/admin-groups/:id',
    method: 'delete',
    tags: ['Admin Group'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Admin group deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Admin group not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteAdminGroupHandler: AppRouteHandler<
    typeof deleteAdminGroupRoute
> = async (c) => {
    const groupId = c.req.param('id')
    try {
        const groupItem = await findGroupById(groupId)
        if (!groupItem) {
            return c.json(
                {
                    data: {},
                    message: 'Admin group not found',
                    success: false,
                },
                NOT_FOUND,
            )
        }

        await deleteGroup(groupId)
        return c.json(
            {
                data: {},
                message: 'Admin group deleted successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting admin group:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            {
                data: {},
                message: 'Internal server error',
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
