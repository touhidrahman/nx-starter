import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectSubscription } from '../subscription.schema'
import { findAllByGroupId } from '../subscriptions.service'
import { checkToken } from '../../auth/auth.middleware'

export const getSubscriptionListRoute = createRoute({
    path: '/v1/subscriptions',
    tags: ['Subscriptions'],
    method: 'get',
    middleware: [checkToken] as const,
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
            {
                data: subscriptions,
                message: 'Subscription list',
                success: true,
            },
            OK,
        )
    } catch (error: any) {
        return c.json(
            { data: {}, message: error.message, success: false, error: error },
            NOT_FOUND,
        )
    }
}
