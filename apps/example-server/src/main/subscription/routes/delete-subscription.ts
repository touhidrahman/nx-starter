import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { findById, deleteById } from '../subscriptions.service'

export const deleteSubscriptionRoute = createRoute({
    path: '/v1/subscriptions/:id',
    method: 'delete',
    tags: ['Subscriptions'],
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Subscription deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Subscription not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteSubscriptionHandler: AppRouteHandler<
    typeof deleteSubscriptionRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const subscription = await findById(id)
        if (!subscription) {
            return c.json(
                jsonResponse({}, 'Subscription not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        await deleteById(id)
        return c.json(
            jsonResponse('', 'Subscription deleted successfully', OK),
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting subscription:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
            return c.json({ data: {}, message: 'Internal Server Error', success: false }, INTERNAL_SERVER_ERROR)

    }
}
