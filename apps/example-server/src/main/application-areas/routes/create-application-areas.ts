import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import {
    zInsertApplicationArea,
    zSelectApplicationArea,
} from '../application-areas.schema'
import { createApplicationArea } from '../application-areas.service'
import { zSelectAppointment } from '../../appointments/appointments.schema'

export const createApplicationAreaRoute = createRoute({
    path: '/v1/application-areas',
    method: 'post',
    tags: ['Application Area'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertApplicationArea, 'Application Area details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            {
                data: zSelectApplicationArea,
                message: z.string(),
                success: z.boolean(),
            },
            'Application area created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid application area' + ' data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal' + ' server error',
        ),
    },
})

export const createApplicationAreaHandler: AppRouteHandler<
    typeof createApplicationAreaRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const newApplicationArea = await createApplicationArea(body)
        return c.json(
            jsonResponse(
                newApplicationArea,
                'Application area created successfully',
                CREATED,
            ),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid application area data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating application area:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to create application area',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
