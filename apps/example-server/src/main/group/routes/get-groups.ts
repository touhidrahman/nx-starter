import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { AppRouteHandler } from '../../../core/core.type'
import { findGroupsByAuthUserId } from '../group.service'
import { OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectGroup } from '../group.schema'
import { zEmpty } from '../../../core/models/common.schema'

export const getGroupsRoute = createRoute({
    path: '/v1/group',
    tags: ['Group'],
    method: 'get',
    middleware: [checkToken],
    request: {},
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectGroup),
                message: z.string(),
                success: z.boolean(),
            },
            'List of Groups',
        ),
    },
})

export const getGroupsHandler: AppRouteHandler<typeof getGroupsRoute> = async (
    c: any,
) => {
    const payload = c.get('jwtPayload')
    const result = await findGroupsByAuthUserId(payload.sub)

    return c.json({ data: result, message: 'My Groups' })
}
