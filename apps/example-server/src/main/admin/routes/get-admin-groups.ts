import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectGroup } from '../admin-groups.schema'
import { findAllGroups } from '../admin-groups.service'

export const getAdminGroupsRoute = createRoute({
    path: '/v1/admin-groups',
    method: 'get',
    tags: ['Admin Group'],
    middleware: [checkToken] as const,
    request: {
        query: z.object({
            page: z.number().int().optional().default(1),
            size: z.number().int().optional().default(10),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectGroup), 'List of Groups'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No groups found'),
    },
})

export const getAdminGroupsHandler: AppRouteHandler<
    typeof getAdminGroupsRoute
> = async (c) => {
    const { page, size } = c.req.query()
    const pageNumber = Number(page) || 1
    const sizeNumber = Number(size) || 10

    const groups = await findAllGroups(pageNumber, sizeNumber)

    if (groups.length === 0) {
        return c.json(
            { data: {}, success: false, message: 'No groups found' },
            NOT_FOUND,
        )
    }

    return c.json({ data: groups, success: true, message: 'Group list' }, OK)
}
