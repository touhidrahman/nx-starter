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

export const updateCaseRoute = createRoute({
    path: '/v1/cases/:id',
    method: 'put',
    tags: ['Case'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateCase, 'Case update details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectCase, 'Case updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid case data'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Case not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
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
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        const [updatedCase] = await updateCase(caseId, body)
        return c.json(
            {
                data: updatedCase,
                message: 'Case updated successfully',
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
            'Error updating case:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
