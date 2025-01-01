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
    path: '/v1/groups/:id',
    method: 'get',
    tags: ['Group'],
    middleware: [checkToken, isGroupParticipant] as const,
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
> = async (c) => {
    const id = c.req.param('id')
    const result = await findGroupById(id)

    if (!result) {
        return c.json(
            { data: {}, success: false, message: 'Group not found' },
            NOT_FOUND,
        )
    }

    return c.json({ data: result, message: 'Group details', success: true }, OK)
}
