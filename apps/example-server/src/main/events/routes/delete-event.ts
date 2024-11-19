import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { deleteEvent, getAnEvent } from '../events.service'

export const deleteEventRoute = createRoute({
    path: '/v1/events/:id',
    method: 'delete',
    tags: ['Event'],
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Event deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Event not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteEventHandler: AppRouteHandler<
    typeof deleteEventRoute
> = async (c) => {
    const eventId = c.req.param('id')

    try {
        const event = await getAnEvent(eventId)
        if (!event) {
            return c.json(
                jsonResponse({}, 'Event not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        await deleteEvent(eventId)
        return c.json(jsonResponse('', 'Event deleted successfully', OK), OK)
    } catch (error) {
        console.error(
            'Error deleting event:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to delete event', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
}
