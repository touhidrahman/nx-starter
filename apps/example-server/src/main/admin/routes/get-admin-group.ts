import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectGroup } from '../admin-groups.schema'
import { findGroupById } from '../admin-groups.service'

export const getAdminGroupRoute = createRoute({
    path: '/v1/admin-group/:id',
    method: 'get',
    tags: ['Admin Group'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectGroup, message: z.string(), success: z.boolean() },
            'Group found',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Group not found',
        ),
    },
})

export const getAdminGroupHandler: AppRouteHandler<
    typeof getAdminGroupRoute
> = async (c) => {
    const groupId = c.req.param('id')
    const groupItem = await findGroupById(groupId)

    if (!groupItem) {
        return c.json(jsonResponse({}, 'Group not found', NOT_FOUND), NOT_FOUND)
    }

    return c.json(jsonResponse(groupItem, 'Group found', OK), OK)
}
