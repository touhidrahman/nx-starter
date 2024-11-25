import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { findCourtById } from '../courts.service'
import { zSelectCourt } from '../courts.schema'

export const getCourtRoute = createRoute({
    path: '/v1/court/:id',
    method: 'get',
    tags: ['Court'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectCourt, 'Court found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Court not found'),
    },
})

export const getCourtHandler: AppRouteHandler<typeof getCourtRoute> = async (
    c,
) => {
    const courtId = c.req.param('id')
    const courtItem = await findCourtById(courtId)

    if (!courtItem) {
        return c.json(
            { message: 'Court not found', data: {}, success: false },
            NOT_FOUND,
        )
    }

    return c.json(
        { data: courtItem, message: 'Court found', success: true },
        OK,
    )
}
