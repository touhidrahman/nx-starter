import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import {
    zInsertSubscription,
    zSelectSubscription,
} from '../subscription.schema'
import { create } from '../subscriptions.service'
import { checkToken } from '../../auth/auth.middleware'

export const createSubscriptionsRoute = createRoute({
    path: '/v1/subscriptions',
    method: 'post',
    tags: ['Subscriptions'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertSubscription, 'Subscription details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            zSelectSubscription,
            'Subscription created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid subscription data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createSubscriptionsHandler: AppRouteHandler<
    typeof createSubscriptionsRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const [subscription] = await create(body)
        return c.json(
            {
                data: subscription,
                message: 'Subscription created successfully',
                success: true,
            },
            CREATED,
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
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
