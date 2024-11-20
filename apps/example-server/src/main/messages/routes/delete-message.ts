import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { deleteMessage, findById } from '../messages.service'

export const deleteMessageRoute = createRoute({
    path: '/v1/messages/:id',
    method: 'delete',
    tags: ['Messages'],
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Document deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteMessageHandler: AppRouteHandler<
    typeof deleteMessageRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const message = await findById(id)
        if (!message) {
            return c.json(
                jsonResponse({}, 'Message not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        await deleteMessage(id)
        return c.json(
            {
                data: {},
                message: 'Message deleted successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting message:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
            return c.json({ data: {}, message: 'Internal Server Error', success: false }, INTERNAL_SERVER_ERROR)

    }
}
