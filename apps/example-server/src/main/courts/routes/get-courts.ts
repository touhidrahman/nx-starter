import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { findAllCourts } from '../courts.service'
import { zSelectCourt } from '../courts.schema'

export const getCourtsRoute = createRoute({
    path: '/v1/courts',
    method: 'get',
    tags: ['Court'],
    middleware: [checkToken],
    request: {},
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectCourt),
                message: z.string(),
                success: z.boolean(),
            },
            'List of Courts',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No courts found'),
    },
})

export const getCourtsHandler: AppRouteHandler<typeof getCourtsRoute> = async (
    c,
) => {
    const courts = await findAllCourts()

    if (courts.length === 0) {
        return c.json({ message: 'No courts found', data: [] }, NOT_FOUND)
    }

    return c.json({ data: courts, message: 'List of Courts' }, OK)
}
