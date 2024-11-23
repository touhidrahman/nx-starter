import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectGroup, zUpdateGroup } from '../group.schema'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { AppRouteHandler } from '../../../core/core.type'
import { updateGroup } from '../group.service'

export const updateGroupByIdRoute = createRoute({
    path: '/v1/group/:id',
    method: 'put',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateGroup, 'Group details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectGroup, 'Updated'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Group not found'),
    },
})

export const updateGroupHandler: AppRouteHandler<
    typeof updateGroupByIdRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')
    const result = await updateGroup(id, body)

    if (result.length === 0) {
        return c.json(
            { message: 'Group not found', data: {}, success: false },
            NOT_FOUND,
        )
    }

    return c.json(
        { data: result[0], message: 'Group updated', success: true },
        OK,
    )
}
