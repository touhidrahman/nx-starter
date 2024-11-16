import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zInsertEvent, zSelectEvent } from '../events.schema'
import { createEvent } from '../events.service'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const createEventRoute = createRoute({
    path: '/v1/events',
    method: 'post',
    tags: ['Event'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zInsertEvent, 'Event details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            { data: zSelectEvent, message: z.string(), success: z.boolean() },
            'Event created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid event data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const createEventHandler: AppRouteHandler<
    typeof createEventRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const event = await createEvent(body)
        return c.json(
            jsonResponse(event, 'Event created successfully', CREATED),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid event data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating event:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to create event', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
}
