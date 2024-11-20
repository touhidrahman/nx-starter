import { createRoute, z } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectGroup } from '../group.schema'
import { findGroupsByAuthUserId } from '../group.service'

export const getGroupsRoute = createRoute({
    path: '/v1/group',
    tags: ['Group'],
    method: 'get',
    middleware: [checkToken],
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectGroup), 'List of Groups'),
    },
})

export const getGroupsHandler: AppRouteHandler<typeof getGroupsRoute> = async (
    c,
) => {
    const payload = c.get('jwtPayload')
    const result = await findGroupsByAuthUserId(payload.sub)

    return c.json(
        {
            data: result.filter((x) => !!x),
            message: 'My Groups',
            success: true,
        },
        OK,
    )
}
