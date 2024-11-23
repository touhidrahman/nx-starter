import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectMessage } from '../messages.schema'
import { findById } from '../messages.service'

export const getMessageRoute = createRoute({
    path: '/v1/messages/:id',
    tags: ['Messages'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectMessage, 'Message details'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Message not found'),
    },
})

export const getMessageHandler: AppRouteHandler<
    typeof getMessageRoute
> = async (c) => {
    const id = c.req.param('id')
    const message = await findById(id)

    if (!message) {
        return c.json(
            { data: {}, message: 'Message not found', success: false },
            NOT_FOUND,
        )
    }
    return c.json(
        { data: message, message: 'Message details', success: true },
        OK,
    )
}
