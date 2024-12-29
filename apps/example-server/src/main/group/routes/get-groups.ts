import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { OK } from 'stoker/http-status-codes'
import { zSelectGroup } from '../group.schema'
import { AppRouteHandler } from '../../../core/core.type'
import { getAllGroups } from '../group.service'

export const getGroupsRoute = createRoute({
    path: '/v1/groups',
    tags: ['Group'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        query: zSelectGroup.extend({
            search: z.string().optional(),
            size: z.string().optional(),
            page: z.string().optional(),
            status: z.enum(['active', 'inactive', 'pending']).optional(),
            type: z.enum(['client', 'vendor']).optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectGroup), 'List of Groups'),
    },
})

export const getGroupsHandler: AppRouteHandler<typeof getGroupsRoute> = async (
    c,
) => {
    const { search, page, size, orderBy, status, type } = c.req.query()

    const pageNumber = Number(page)
    const limitNumber = Number(size)

    const validStatus: 'active' | 'inactive' | 'pending' = status as
        | 'active'
        | 'inactive'
        | 'pending'
    const validType: 'client' | 'vendor' = type as 'client' | 'vendor'

    const { data, meta } = await getAllGroups({
        status: validStatus,
        type: validType,
        search,
        page: pageNumber,
        size: limitNumber,
        orderBy,
    })

    return c.json(
        {
            data: data,
            pagination: {
                page: meta.page,
                size: meta.size,
                total: meta.totalCount,
            },
            message: 'Group list',
            success: true,
        },
        OK,
    )
}
