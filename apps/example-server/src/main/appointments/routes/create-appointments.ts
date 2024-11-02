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
import { zInsertAppointment, zSelectAppointment } from '../appointments.schema'
import { appointmentService } from '../appointments.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const createAppointmentRoute = createRoute({
    path: '/v1/appointments',
    method: 'post',
    tags: ['Appointment'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertAppointment, 'Appointment details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            zSelectAppointment,
            'Appointment created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid appointment data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createAppointmentHandler: AppRouteHandler<
    typeof createAppointmentRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const newAppointment = await appointmentService.createAppointment(body)
        return c.json(
            jsonResponse(
                newAppointment,
                'Appointment created successfully',
                CREATED,
            ),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid appointment data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating appointment:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to create appointment',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
