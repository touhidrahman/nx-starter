import { createRoute, z } from '@hono/zod-openapi'
import { OK, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { deleteMessage } from '../messages.service'

export const deleteAllMessagesRoute = createRoute({
    path: '/v1/messages',
    method: 'delete',
    tags: ['Messages'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(
            z.object({ ids: z.array(z.string()) }),
            'Messages ids details',
        ),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Messages deleted successfully'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteAllMessagesHandler: AppRouteHandler<
    typeof deleteAllMessagesRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        for (const id of body.ids) {
            await deleteMessage(id)
        }
    } catch (error) {
        console.error(
            'Error deleting messages:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
    return c.json(
        { data: {}, message: 'Messages deleted successfully', success: true },
        OK,
    )
}
