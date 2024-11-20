import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { createCourt } from '../courts.service'
import { zInsertCourt, zSelectCourt } from '../courts.schema'

export const createCourtRoute = createRoute({
    path: '/v1/courts',
    method: 'post',
    tags: ['Court'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertCourt, 'Court details'),
    },
    responses: {
        [CREATED]: ApiResponse( zSelectCourt,
            'Court created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid court data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createCourtHandler: AppRouteHandler<
    typeof createCourtRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const newCourt = await createCourt(body)
        return c.json(
            jsonResponse(newCourt, 'Court created successfully', CREATED),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ data: {}, message: 'Bad request', success: false, error: error.errors }, BAD_REQUEST)

        }
        console.error(
            'Error creating court:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
            return c.json({ data: {}, message: 'Internal Server Error', success: false }, INTERNAL_SERVER_ERROR)

    }
}
