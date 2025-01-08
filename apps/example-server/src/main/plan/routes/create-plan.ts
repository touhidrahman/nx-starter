import { createRoute, z } from "@hono/zod-openapi";
import { InsertPlan, zInsertPlan, zSelectPlan } from "../plan.schema";
import { checkToken } from "../../auth/auth.middleware";
import { checkLevel } from "../../../core/middlewares/user-level.middleware";
import { UserLevel } from "../../../../../../libs/app-example-models/src";
import { jsonContent } from "stoker/openapi/helpers";
import { ApiResponse } from "../../../core/utils/api-response.util";
import { zEmpty } from "../../../core/models/common.schema";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from "stoker/http-status-codes";
import { AppRouteHandler } from "../../../core/core.type";
import { createPlan, findPlanById } from "../plan.service";


export const createPlanRoute = createRoute({
    path: '/v1/plan',
    method: 'post',
    tags: ['Plan'],
    middleware: [checkToken, checkLevel([UserLevel.Admin, UserLevel.Moderator])] as const,
    request: {
        body: jsonContent(zInsertPlan, 'Plan details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectPlan, 'Plan created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid plan data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal Server error'),
    },
})


export const createPlanHandler: AppRouteHandler<typeof createPlanRoute> = async (c) => {
    const body = c.req.valid('json') as InsertPlan
    try {
        const existingPlan = await findPlanById(body?.name ?? '')

        if (existingPlan) {
            return c.json(
                {
                    data: {},
                    message: `Plan already exists with plan : ${body.name}`,
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        const [newPlan] = await createPlan(body)
        return c.json(
            {
                data: newPlan,
                message: 'Plan created successfully',
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
                    message: 'Invalid plan data',
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating plan:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Failed to create plan', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
