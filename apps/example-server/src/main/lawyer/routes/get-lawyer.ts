import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { zSelectLawyer } from '../lawyer.schema'
import { zEmpty } from '../../../core/models/common.schema'
import { AppRouteHandler } from '../../../core/core.type'
import { findLawyerById } from '../lawyer.service'

export const getLawyerRoute = createRoute({
    path: '/v1/lawyer/:id',
    method: 'get',
    tags: ['Lawyer'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectLawyer, 'Lawyer found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Lawyer not found'),
    },
})

export const getLawyerHandler: AppRouteHandler<typeof getLawyerRoute> = async (
    c,
) => {
    const lawyerId = c.req.param('id')
    const lawyer = await findLawyerById(lawyerId)

    if (!lawyer) {
        return c.json(
            { data: {}, message: 'Lawyer not found', success: false },
            NOT_FOUND,
        )
    }

    return c.json({ data: lawyer, message: 'Lawyer found', success: true }, OK)
}
