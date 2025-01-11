import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteLawyer, findLawyerById } from '../lawyer.service'
import {
    USER_LEVEL_ADMIN,
    USER_LEVEL_MODERATOR,
} from '../../user/user.schema'
import { checkLevel } from '../../../core/middlewares/user-level.middleware'

export const deleteLawyerRoute = createRoute({
    path: '/v1/lawyers/:id',
    method: 'delete',
    tags: ['Lawyer'],
    middleware: [checkToken, checkLevel([USER_LEVEL_ADMIN, USER_LEVEL_MODERATOR])] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Lawyer deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Lawyer not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteLawyerHandler: AppRouteHandler<
    typeof deleteLawyerRoute
> = async (c) => {
    const lawyerId = c.req.param('id')

    try {
        const lawyer = await findLawyerById(lawyerId)
        if (!lawyer) {
            return c.json(
                { data: {}, message: 'Lawyer not found', success: false },
                NOT_FOUND,
            )
        }

        await deleteLawyer(lawyerId)
        return c.json(
            {
                data: { lawyerId },
                message: 'Lawyer deleted successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting lawyer:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Failed to delete lawyer', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
