import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectMessage } from '../messages.schema'
import { findById } from '../messages.service'

export const getMessageRoute = createRoute({
    path: '/v1/messages/:id',
    tags: ['Messages'],
    method: 'get',
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectMessage),
                message: z.string(),
                success: z.boolean(),
            },
            'Message details',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Message not found',
        ),
    },
})

export const getMessageHandler: AppRouteHandler<
    typeof getMessageRoute
> = async (c) => {
    const id = c.req.param('id')
    const message = await findById(id)

    if (!message) {
        return c.json(
            jsonResponse({}, 'Message not found', NOT_FOUND),
            NOT_FOUND,
        )
    }
    return c.json(jsonResponse(message, 'Message details', OK), OK)
}
