import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zInsertMessage, zSelectMessage } from '../messages.schema'
import { create } from '../messages.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const createMessageRoute = createRoute({
    path: '/v1/messages',
    method: 'post',
    tags: ['Messages'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zInsertMessage, 'Message details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectMessage, 'Message created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid message data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createMessageHandler: AppRouteHandler<
    typeof createMessageRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const message = await create(body)
        return c.json(
            jsonResponse(message, 'message created successfully', CREATED),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid message details', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'message created successfully',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
