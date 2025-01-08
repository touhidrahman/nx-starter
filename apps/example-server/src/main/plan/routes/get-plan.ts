import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { zEmpty } from '../../../core/models/common.schema'
import { AppRouteHandler } from '../../../core/core.type'
import { zSelectPlan } from '../plan.schema'
import { findPlanById } from '../plan.service'


export const getPlanRoute = createRoute({
    path: '/v1/plan/:id',
    method: 'get',
    tags: ['Plan'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectPlan, 'Plan found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Plan not found'),
    },
})

export const getPlanHandler: AppRouteHandler<typeof getPlanRoute> = async (c) => {
    const planId = c.req.param('id')
    const plan = await findPlanById(planId)

    if (!plan) {
        return c.json(
            { data: {}, message: 'plan not found', success: false },
            NOT_FOUND,
        )
    }

    return c.json({ data: plan, message: 'plan found', success: true }, OK)
}
