import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deletePlan, findPlanById } from '../plan.service'


export const deletePlanRoute = createRoute({
    path: '/v1/plans/:id',
    method: 'delete',
    tags: ['Plan'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Plan deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Plan not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deletePlanHandler: AppRouteHandler<typeof deletePlanRoute> = async (c) => {
    const planId = c.req.param('id')

    try {
        const plan = await findPlanById(planId)
        if (!plan) {
            return c.json(
                { data: {}, message: 'plan not found', success: false },
                NOT_FOUND,
            )
        }

        await deletePlan(planId)
        return c.json(
            {
                data: { planId },
                message: 'Plan deleted successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting plan:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Failed to delete plan', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}