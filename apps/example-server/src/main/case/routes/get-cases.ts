import { createRoute, z } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectCase } from '../case.schema'
import { getAllCasesByGroupId } from '../case.service'

export const getCasesRoute = createRoute({
    path: '/v1/cases',
    method: 'get',
    tags: ['Case'],
    middleware: [checkToken] as const,
    request: {
        query: zSelectCase.extend({
            search: z.string().optional(),
            page: z.string().optional(),
            size: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectCase), 'List of Cases'),
    },
})

export const getCasesHandler: AppRouteHandler<typeof getCasesRoute> = async (
    c,
) => {
    const payload = await c.get('jwtPayload')
    const { search, page, size } = c.req.query()

    const pageNumber = Number(page)
    const limitNumber = Number(size)

    const { groupId } = payload || {}
    const { data, meta } = await getAllCasesByGroupId({
        groupId,
        search,
        page: pageNumber,
        size: limitNumber,
    })

    return c.json(
        {
            data: data,
            pagination: {
                page: meta.page,
                size: meta.size,
                total: meta.totalCount,
            },
            message: 'Cases list',
            success: true,
        },
        OK,
    )
}
