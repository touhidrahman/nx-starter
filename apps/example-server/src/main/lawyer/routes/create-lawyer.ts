import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { InsertLawyer, zInsertLawyer, zSelectLawyer } from '../lawyer.schema'
import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
} from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { createLawyer, findLawyerById } from '../lawyer.service'
import { AppRouteHandler } from '../../../core/core.type'

export const createLawyerRoute = createRoute({
    path: '/v1/lawyer',
    method: 'post',
    tags: ['Lawyer'],
    //! TODO: [checkToken, checkLevel([UserLevel.Admin, UserLevel.Moderator])] as const
    // middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertLawyer, 'Lawyer details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectLawyer, 'Lawyer created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid lawyer data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal Server error'),
    },
})

export const createLawyerHandler: AppRouteHandler<
    typeof createLawyerRoute
> = async (c) => {
    const body = c.req.valid('json') as InsertLawyer
    try {
        const existingLawyer = await findLawyerById(body?.email ?? '')

        if (existingLawyer) {
            return c.json(
                {
                    data: {},
                    message: `Lawyer already exists with lawyer : ${body.email}`,
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        const [newLawyer] = await createLawyer(body)
        return c.json(
            {
                data: newLawyer,
                message: 'Lawyer created successfully',
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
                    message: 'Invalid lawyer data',
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating lawyer:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Failed to create lawyer', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
