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
import { UserLevel } from '../../../../../../libs/app-example-models/src'
import { checkLevel } from '../../../core/middlewares/user-level.middleware'
import { zSelectPlan, zUpdatePlan } from '../plan.schema'
import { findPlanById, updatePlan } from '../plan.service'

export const updatePlanRoute = createRoute({
    path: '/v1/plans/:id',
    method: 'put',
    tags: ['Plan'],
    middleware: [checkToken, checkLevel([UserLevel.Admin, UserLevel.Moderator])] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdatePlan, 'plan update details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectPlan, 'plan updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid plan data'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'plan not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updatePlanHandler: AppRouteHandler<typeof updatePlanRoute> = async (c) => {
    const planId = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingPlan = await findPlanById(planId)
        if (!existingPlan) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        const [updatedPlan] = await updatePlan(planId, body)
        return c.json(
            {
                data: updatedPlan,
                message: 'plan updated successfully',
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
            'Error updating plan:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
