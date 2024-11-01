import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { applicationAreasService } from '../application-areas.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const deleteApplicationAreaRoute = createRoute({
    path: '/v1/application-areas/:id',
    method: 'delete',
    tags: ['Application Area'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Application area deleted'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Application area not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteApplicationAreaHandler: AppRouteHandler<
    typeof deleteApplicationAreaRoute
> = async (c) => {
    const areaId = c.req.param('id')

    try {
        const applicationArea =
            await applicationAreasService.findApplicationAreaById(areaId)
        if (!applicationArea) {
            return c.json(
                jsonResponse({}, 'Application area not found', NOT_FOUND),
                NOT_FOUND,
            )
        }
        await applicationAreasService.deleteApplicationArea(areaId)
        return c.json(jsonResponse({}, 'Application area deleted', OK), OK)
    } catch (error) {
        console.error(
            'Error deleting application area:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to delete application area',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
