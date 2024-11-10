import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectApplicationArea } from '../application-areas.schema'
import { findApplicationAreaById } from '../application-areas.service'

export const getApplicationAreaRoute = createRoute({
    path: '/v1/application-areas/:id',
    method: 'get',
    tags: ['Application Area'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectApplicationArea, 'Application area found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Application area not found'),
    },
})

export const getApplicationAreaHandler: AppRouteHandler<
    typeof getApplicationAreaRoute
> = async (c) => {
    const areaId = c.req.param('id')
    const applicationArea = await findApplicationAreaById(areaId)

    if (!applicationArea) {
        return c.json(
            { message: 'Application area not found', data: {} },
            NOT_FOUND,
        )
    }

    return c.json(
        { data: applicationArea, message: 'Application area found' },
        OK,
    )
}
