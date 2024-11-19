import { createRoute, z } from '@hono/zod-openapi'
import {
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectGroup, zUpdateGroup } from '../admin-groups.schema'
import { findGroupById, updateGroup } from '../admin-groups.service'

export const updateAdminGroupRoute = createRoute({
    path: '/v1/admin-groups/:id',
    method: 'put',
    tags: ['Admin Group'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateGroup, 'Admin group update details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectGroup, 'Admin group updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid admin group data'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Admin group not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updateAdminGroupHandler: AppRouteHandler<
    typeof updateAdminGroupRoute
> = async (c) => {
    const groupId = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingGroup = await findGroupById(groupId)
        if (!existingGroup) {
            return c.json(
                { data: {}, message: 'Admin group not found', success: false },
                NOT_FOUND,
            )
        }

        const updatedGroup = await updateGroup(groupId, body)
        return c.json(
            {
                data: updatedGroup[0],
                success: true,
                message: 'Admin group updated successfully',
            },
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Invalid admin group data',
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating admin group:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal server error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
