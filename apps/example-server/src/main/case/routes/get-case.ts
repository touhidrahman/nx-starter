import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectCase } from '../case.schema'
import { findCaseById } from '../case.service'

export const getCaseRoute = createRoute({
    path: '/v1/case/:id',
    method: 'get',
    tags: ['Case'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectCase, message: z.string(), success: z.boolean() },
            'Case found',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Case not found',
        ),
    },
})

export const getCaseHandler: AppRouteHandler<typeof getCaseRoute> = async (
    c,
) => {
    const caseId = c.req.param('id')
    const caseItem = await findCaseById(caseId)

    if (!caseItem) {
        return c.json(jsonResponse({}, 'Case not found', NOT_FOUND), NOT_FOUND)
    }

    return c.json(jsonResponse(caseItem, 'Case found', OK), OK)
}
