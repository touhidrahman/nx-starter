import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectMessage } from '../messages.schema'
import { listAll } from '../messages.service'

export const getMessageListRoute = createRoute({
    path: '/v1/messages',
    tags: ['Messages'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectMessage),
                message: z.string(),
                success: z.boolean(),
            },
            'List of messages',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'No messages found!',
        ),
    },
})

export const getMessageListHandler: AppRouteHandler<
    typeof getMessageListRoute
> = async (c: any) => {
    try {
        const messages = await listAll()

        return c.json({ data: messages, message: 'Messages list' }, OK)
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            NOT_FOUND,
        )
    }
}
