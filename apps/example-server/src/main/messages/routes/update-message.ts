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
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Message not found'),
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
            return c.json({ data: {}, message: 'Bad request', success: false, error: error.errors }, BAD_REQUEST)

        }
        console.error(
            'Error updating message:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
            return c.json({ data: {}, message: 'Internal Server Error', success: false }, INTERNAL_SERVER_ERROR)

    }
}
