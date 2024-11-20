import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectSubscription } from '../subscription.schema'
import { findAllByGroupId } from '../subscriptions.service'

export const getSubscriptionListRoute = createRoute({
    path: '/v1/subscriptions',
    tags: ['Subscriptions'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectSubscription),

            'List of subscriptions',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No subscriptions found!'),
    },
})

export const getSubscriptionListHandler: AppRouteHandler<
    typeof getSubscriptionListRoute
> = async (c) => {
    try {
        const payload = await c.get('jwtPayload')
        const subscriptions = await findAllByGroupId(payload.groupId)
        return c.json(
            { data: subscriptions, message: 'Subscription list', success: true },
OK)
    } catch (error: any) {
        return c.json(
            jsonResponse({}, 'Internal server error', NOT_FOUND),
            NOT_FOUND,
        )
    }
}
