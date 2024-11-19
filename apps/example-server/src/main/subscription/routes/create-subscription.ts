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
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import {
    zInsertSubscription,
    zSelectSubscription,
} from '../subscription.schema'
import { create } from '../subscriptions.service'

export const createSubscriptionsRoute = createRoute({
    path: '/v1/subscriptions',
    method: 'post',
    tags: ['Subscriptions'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zInsertSubscription, 'Subscription details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            {
                data: zSelectSubscription,
                message: z.string(),
                success: z.boolean(),
            },
            'Subscription created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid subscription data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const createSubscriptionsHandler: AppRouteHandler<
    typeof createSubscriptionsRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const subscription = await create(body)
        return c.json(
            jsonResponse(
                subscription,
                'Subscription created successfully',
                CREATED,
            ),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid subscription details', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Subscription created successfully',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
