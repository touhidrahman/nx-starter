import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { zSelectGroup } from '../group.schema'
import { NO_CONTENT, NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { AppRouteHandler } from '../../../core/core.type'
import { deleteGroup } from '../group.service'

export const deleteGroupByIdRoute = createRoute({
    path: '/v1/group/:id',
    method: 'delete',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [NO_CONTENT]: ApiResponse(zSelectGroup, 'Deleted'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Group not found'),
    },
})

export const deleteGroupHandler: AppRouteHandler<
    typeof deleteGroupByIdRoute
> = async (c) => {
    const id = c.req.param('id')
    const result = await deleteGroup(id)

    if (result.length === 0) {
        return c.json({ error: 'Group not found' }, 404)
    }

    return c.json({ data: result, message: 'Group deleted' })
}
