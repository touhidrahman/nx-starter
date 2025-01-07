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
import { zSelectLawyer, zUpdateLawyer } from '../lawyer.schema'
import { findLawyerById, updateLawyer } from '../lawyer.service'

export const updateLawyerRoute = createRoute({
    path: '/v1/Lawyer/:id',
    method: 'put',
    tags: ['Lawyer'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateLawyer, 'Lawyer update details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectLawyer, 'Lawyer updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid Lawyer data'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Lawyer not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updateLawyerHandler: AppRouteHandler<
    typeof updateLawyerRoute
> = async (c) => {
    const LawyerId = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingLawyer = await findLawyerById(LawyerId)
        if (!existingLawyer) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        const [updatedLawyer] = await updateLawyer(LawyerId, body)
        return c.json(
            {
                data: updatedLawyer,
                message: 'Lawyer updated successfully',
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
            'Error updating Lawyer:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
