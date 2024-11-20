import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectEvent } from '../events.schema'
import { getEventsList } from '../events.service'

export const getEventsRoute = createRoute({
    path: '/v1/events',
    tags: ['Event'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectEvent), 'List of events'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No cases found'),
    },
})

export const getEventsHandler: AppRouteHandler<typeof getEventsRoute> = async (
    c,
) => {
    const payload = await c.get('jwtPayload')
    const groupId = payload.groupId

    const events = await getEventsList(groupId)

    if (events.length === 0) {
        return c.json(
            { data: {}, message: 'No event found', success: false },
            NOT_FOUND,
        )
    }

    return c.json({ data: events, message: 'Event list', success: true }, OK)
}
