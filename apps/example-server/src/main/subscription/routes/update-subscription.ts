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
import {
    zSelectSubscription,
    zUpdateSubscription,
} from '../subscription.schema'
import { findById, updateById } from '../subscriptions.service'

export const updateSubscriptionRoute = createRoute({
    path: '/v1/subscriptions/:id',
    method: 'patch',
    tags: ['Subscriptions'],
    middleware: [authMiddleware],
    request: {
        param: z.object({ id: z.string() }),
        body: jsonContent(zUpdateSubscription, 'Subscription details'),
    },
    responses: {
        [OK]: ApiResponse(
            zUpdateSubscription,

            'Subscription updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid subscription data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Subscription not found'),
    },
})

export const updateSubscriptionHandler: AppRouteHandler<
    typeof updateSubscriptionRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')
    const payload = c.get('jwtPayload')

    try {
        const subscription = await findById(id)
        if (!subscription) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }
        const updatedMessage = await updateById(id, payload.groupId, body)

        return c.json(
            jsonResponse(
                updatedMessage,
                'Subscription created successfully',
                OK,
            ),
            OK,
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
            'Error updating subscription:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
