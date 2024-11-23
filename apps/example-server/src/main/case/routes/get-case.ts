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
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectCase, 'Case found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Case not found'),
    },
})

export const getCaseHandler: AppRouteHandler<typeof getCaseRoute> = async (
    c,
) => {
    const caseId = c.req.param('id')
    const caseItem = await findCaseById(caseId)

    if (!caseItem) {
        return c.json(
            { data: {}, message: 'Case not found', success: false },
            NOT_FOUND,
        )
    }

    return c.json({ data: caseItem, message: 'Case found', success: true }, OK)
}
