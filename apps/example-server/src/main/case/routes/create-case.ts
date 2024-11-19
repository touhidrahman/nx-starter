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
import { zInsertCase, zSelectCase } from '../case.schema'
import { zEmpty } from '../../../core/models/common.schema'
import { createCase } from '../case.service'

export const createCaseRoute = createRoute({
    path: '/v1/cases',
    method: 'post',
    tags: ['Case'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertCase, 'Case details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            { data: zSelectCase, message: z.string(), success: z.boolean() },
            'Case created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid case data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createCaseHandler: AppRouteHandler<
    typeof createCaseRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const newCase = await createCase(body)
        return c.json(
            jsonResponse(newCase, 'Case created successfully', CREATED),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid case data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating case:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to create case', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
}
