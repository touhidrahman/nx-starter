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

export const createEventRoute = createRoute({
    path: '/v1/events',
    method: 'post',
    tags: ['Event'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertEvent, 'Event details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectEvent, 'Event created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid event data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createEventHandler: AppRouteHandler<
    typeof createEventRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const [event] = await createEvent(body)
        return c.json(
            {
                data: event,
                message: 'Event created successfully',
                success: true,
            },
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Bad request',
                    success: false,
                    error: error.errors,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating event:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
