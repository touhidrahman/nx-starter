import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectGroup } from '../group.schema'
import { findGroupById } from '../group.service'
import { isGroupParticipant } from '../../../core/middlewares/is-group-owner.middleware'

export const getGroupByIDRoute = createRoute({
    path: '/v1/group/:id',
    method: 'get',
    tags: ['Group'],
    middleware: [checkToken, isGroupParticipant],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectGroup, 'Group found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Group not found'),
    },
})
export const getGroupByIdHandler: AppRouteHandler<
    typeof getGroupByIDRoute
> = async (c: any) => {
    const id = c.req.param('id')
    const result = await findGroupById(id)

    if (!result) {
        return c.json({ error: 'Group not found' }, 404)
    }

    return c.json({ data: result, message: 'Group details' })
}
