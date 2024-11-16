import { createRoute, z } from '@hono/zod-openapi'
import {
    BAD_REQUEST,
    OK,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zSelectMessage, zUpdateMessage } from '../messages.schema'
import { findById, update } from '../messages.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const updateMessageRoute = createRoute({
    path: '/v1/messages/:id',
    method: 'patch',
    tags: ['Messages'],
    middleware: [authMiddleware],
    request: {
        param: z.object({ id: z.string() }),
        body: jsonContent(zUpdateMessage, 'Message details'),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectMessage, message: z.string(), success: z.boolean() },
            'Message updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid document data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Message not found',
        ),
    },
})

export const updateMessageHandler: AppRouteHandler<
    typeof updateMessageRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const message = await findById(id)
        if (!message) {
            return c.json(
                jsonResponse({}, 'Message not found', NOT_FOUND),
                NOT_FOUND,
            )
        }
        const updatedMessage = await update(id, body)

        return c.json(
            jsonResponse(updatedMessage, 'Message created successfully', OK),
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid message data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating message:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to create message', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
}
