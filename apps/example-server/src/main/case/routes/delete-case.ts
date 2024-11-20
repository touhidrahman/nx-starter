import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteCase, findCaseById } from '../case.service'

export const deleteCaseRoute = createRoute({
    path: '/v1/cases/:id',
    method: 'delete',
    tags: ['Case'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Case deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Case not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteCaseHandler: AppRouteHandler<
    typeof deleteCaseRoute
> = async (c) => {
    const caseId = c.req.param('id')

    try {
        const caseItem = await findCaseById(caseId)
        if (!caseItem) {
            return c.json(
                { data: {}, message: 'Case not found', success: false },
                NOT_FOUND,
            )
        }

        await deleteCase(caseId)
        return c.json(
            { data: {}, message: 'Case deleted successfully', success: true },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting case:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Failed to delete case', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
