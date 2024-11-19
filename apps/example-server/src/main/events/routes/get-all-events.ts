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
        [OK]: ApiResponse(
            {
                data: z.array(zSelectEvent),
                message: z.string(),
                success: z.boolean(),
            },
            'List of events',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'No cases found',
        ),
    },
})

export const getEventsHandler: AppRouteHandler<typeof getEventsRoute> = async (
    c,
) => {
    const payload = await c.get('jwtPayload')
    const groupId = payload.groupId

    const events = await getEventsList(groupId)

    if (events.length === 0) {
        return c.json(jsonResponse({}, 'No event found', NOT_FOUND), NOT_FOUND)
    }

    return c.json(jsonResponse(events, 'Event list', OK), OK)
}