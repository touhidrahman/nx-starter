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
import { zUpdateCase, zSelectCase } from '../case.schema'
import { findCaseById, updateCase } from '../case.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const updateCaseRoute = createRoute({
    path: '/v1/cases/:id',
    method: 'put',
    tags: ['Case'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateCase, 'Case update details'),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectCase, message: z.string(), success: z.boolean() },
            'Case updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid case data',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Case not found',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const updateCaseHandler: AppRouteHandler<
    typeof updateCaseRoute
> = async (c) => {
    const caseId = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingCase = await findCaseById(caseId)
        if (!existingCase) {
            return c.json(
                jsonResponse({}, 'Case not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        const updatedCase = await updateCase(caseId, body)
        return c.json(
            jsonResponse(updatedCase, 'Case updated successfully', OK),
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid case data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating case:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to update case', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
}
