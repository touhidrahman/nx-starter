import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import {
    zSelectApplicationArea,
    zUpdateApplicationArea,
} from '../application-areas.schema'
import { updateApplicationArea } from '../application-areas.service'

export const updateApplicationAreaRoute = createRoute({
    path: '/v1/application-areas/:id',
    method: 'put',
    tags: ['Application Area'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateApplicationArea, 'Application Area details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectApplicationArea, 'Updated'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Application area not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updateApplicationAreaHandler: AppRouteHandler<
    typeof updateApplicationAreaRoute
> = async (c) => {
    const body = c.req.valid('json')
    const areaId = c.req.param('id')

    try {
        const updatedApplicationArea = await updateApplicationArea(areaId, body)

        if (!updatedApplicationArea) {
            return c.json(
                jsonResponse({}, 'Application area not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        return c.json(
            jsonResponse(
                updatedApplicationArea,
                'Application area updated',
                OK,
            ),
            OK,
        )
    } catch (error) {
        console.error(
            'Error updating application area:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)

        return c.json(
            jsonResponse(
                {},
                'Failed to update application area',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
