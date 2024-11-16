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

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const updateCourtRoute = createRoute({
    path: '/v1/courts/:id',
    method: 'put',
    tags: ['Court'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateCourt, 'Court update details'),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectCourt, message: z.string(), success: z.boolean() },
            'Court updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid court data',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Court not found',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
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
                jsonResponse({}, 'Court not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        const updatedCourt = await updateCourt(courtId, body)
        return c.json(
            jsonResponse(updatedCourt, 'Court updated successfully', OK),
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid court data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating court:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to update court', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
}
