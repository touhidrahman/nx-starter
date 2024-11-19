import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectEvent } from '../events.schema'
import { getAnEvent } from '../events.service'

export const getEventRoute = createRoute({
    path: '/v1/events/:id',
    tags: ['Event'],
    method: 'get',
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectEvent),
                message: z.string(),
                success: z.boolean(),
            },
            'Event found',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No cases found'),
    },
})

export const getEventHandler: AppRouteHandler<typeof getEventRoute> = async (
    c,
) => {
    const id = c.req.param('id')

    const event = await getAnEvent(id)

    if (event.length === 0) {
        return c.json(jsonResponse({}, 'No event found', NOT_FOUND), NOT_FOUND)
    }

    return c.json(jsonResponse(event, 'Event details', OK), OK)
}
