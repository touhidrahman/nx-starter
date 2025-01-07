import { createRoute, z } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectLawyer } from '../lawyer.schema'
import { getAllLawyer } from '../lawyer.service'


export const getLawyersRoute = createRoute({
    path: '/v1/lawyers',
    method: 'get',
    tags: ['Lawyer'],

    request: {
        query: zSelectLawyer.extend({
            search: z.string().optional(),
            page: z.string().optional(),
            size: z.string().optional(),
            orderBy: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectLawyer), 'List of Cases'),
    },
})

export const getLawyersHandler: AppRouteHandler<typeof getLawyersRoute> = async (c) => {
    const { search, page, size, orderBy } = c.req.query()

    const pageNumber = Number(page)
    const limitNumber = Number(size)


    const { data, meta } = await getAllLawyer({
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
            message: 'Lawyer list',
            success: true,
        },
        OK,
    )
}