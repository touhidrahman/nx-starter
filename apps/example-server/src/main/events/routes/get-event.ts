import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectEvent } from '../events.schema'
import { getAnEvent, getEventsList } from '../events.service'

export const getEventRoute = createRoute({
    path: '/v1/event/:id',
    tags: ['Event'],
    method: 'get',
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectEvent), 'Event found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No cases found'),
    },
})

export const getEventHandler: AppRouteHandler<typeof getEventRoute> = async (
    c,
) => {
    const id = c.req.param('id')

    const event = await getAnEvent(id)

    if (event.length === 0) {
        return c.json({ message: 'No event found', data: [] }, NOT_FOUND)
    }

    return c.json({ data: event, message: 'Event found' }, OK)
}
