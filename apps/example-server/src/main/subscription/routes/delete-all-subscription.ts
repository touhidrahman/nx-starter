import { createRoute, z } from '@hono/zod-openapi'
import { OK, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { jsonContent } from 'stoker/openapi/helpers'
import { deleteManyByIds } from '../subscriptions.service'
import { checkToken } from '../../auth/auth.middleware'

export const deleteAllSubscriptionRoute = createRoute({
    path: '/v1/subscriptions',
    method: 'delete',
    tags: ['Subscriptions'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(
            z.object({ ids: z.array(z.string()) }),
            'Subscriptions ids details',
        ),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Subscriptions deleted successfully'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteAllSubscriptionHandler: AppRouteHandler<
    typeof deleteAllSubscriptionRoute
> = async (c) => {
    const body = c.req.valid('json')
    const payload = c.get('jwtPayload')

    try {
        await deleteManyByIds(body.ids, payload.groupId)
    } catch (error) {
        console.error(
            'Error deleting subscriptions:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
    return c.json(
        {
            data: {},
            message: 'Subscriptions deleted successfully',
            success: true,
        },
        OK,
    )
}
