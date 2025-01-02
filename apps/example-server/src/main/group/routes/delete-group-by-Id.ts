import { createRoute } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteGroup } from '../group.service'

export const deleteGroupByIdRoute = createRoute({
    path: '/v1/groups/:id',
    method: 'delete',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Deleted'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Group not found'),
    },
})

export const deleteGroupHandler: AppRouteHandler<
    typeof deleteGroupByIdRoute
> = async (c) => {
    const id = c.req.param('id')
    const [result] = await deleteGroup(id)

    if (!result) {
        return c.json(
            { message: 'Group not found', success: false, data: {} },
            NOT_FOUND,
        )
    }

    return c.json({ message: 'Group deleted', success: true, data: {} }, OK)
}
