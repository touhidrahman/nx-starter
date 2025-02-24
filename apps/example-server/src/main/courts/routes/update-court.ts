import { createRoute, z } from '@hono/zod-openapi'
import {
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { findCourtById, updateCourt } from '../courts.service'
import { zSelectCourt, zUpdateCourt } from '../courts.schema'

export const updateCourtRoute = createRoute({
    path: '/v1/courts/:id',
    method: 'put',
    tags: ['Court'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateCourt, 'Court update details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectCourt, 'Court updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid court data'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Court not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updateCourtHandler: AppRouteHandler<
    typeof updateCourtRoute
> = async (c) => {
    const courtId = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingCourt = await findCourtById(courtId)
        if (!existingCourt) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        const [updatedCourt] = await updateCourt(courtId, body)
        return c.json(
            {
                data: updatedCourt,
                message: 'Court updated successfully',
                success: true,
            },
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
            'Error updating court:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
