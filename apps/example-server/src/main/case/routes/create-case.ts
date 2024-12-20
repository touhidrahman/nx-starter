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
import { InsertCase, zInsertCase, zSelectCase } from '../case.schema'
import { zEmpty } from '../../../core/models/common.schema'
import { createCase } from '../case.service'

export const createCaseRoute = createRoute({
    path: '/v1/cases',
    method: 'post',
    tags: ['Case'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertCase, 'Case details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectCase, 'Case created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid case data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createCaseHandler: AppRouteHandler<
    typeof createCaseRoute
> = async (c) => {
    const body = c.req.valid('json') as InsertCase

    try {
        const [newCase] = await createCase(body)
        return c.json(
            {
                data: newCase,
                message: 'Case created successfully',
                success: true,
            },
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    error: error.errors,
                    message: 'Invalid case data',
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating case:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Failed to create case', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
