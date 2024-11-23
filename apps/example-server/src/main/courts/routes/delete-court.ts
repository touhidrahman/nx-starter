import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteCourt, findCourtById } from '../courts.service'

export const deleteCourtRoute = createRoute({
    path: '/v1/courts/:id',
    method: 'delete',
    tags: ['Court'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Court deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Court not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteCourtHandler: AppRouteHandler<
    typeof deleteCourtRoute
> = async (c) => {
    const courtId = c.req.param('id')

    try {
        const courtItem = await findCourtById(courtId)
        if (!courtItem) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        await deleteCourt(courtId)
        return c.json(
            { data: {}, message: 'Court deleted successfully', success: true },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting court:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
