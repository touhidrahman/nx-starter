import { createRoute, z } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectPlan } from '../plan.schema'
import { getAllPlans } from '../plan.service'


export const getPlansRoute = createRoute({
    path: '/v1/plans',
    method: 'get',
    tags: ['Plan'],
    request: {
        query: z.object({
            search: z.string().optional(),
            page: z.coerce.number().optional(),
            size: z.coerce.number().optional(),
            orderBy: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectPlan), 'List of Plans'),
    },
})

export const getPlansHandler: AppRouteHandler<typeof getPlansRoute> = async (c) => {
    const { search, page, size, orderBy } = c.req.query()

    const pageNumber = Number(page)
    const limitNumber = Number(size)

    const { data, meta } = await getAllPlans({
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
            message: 'Plan list',
            success: true,
        },
        OK,
    )
}
