import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectAppointment } from '../appointments.schema'
import { findAppointmentById } from '../appointments.service'

export const getAppointmentRoute = createRoute({
    path: '/v1/appointment/:id',
    method: 'get',
    tags: ['Appointment'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: zSelectAppointment,
                message: z.string(),
                success: z.boolean(),
            },
            'Appointment found',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Appointment not found',
        ),
    },
})

export const getAppointmentHandler: AppRouteHandler<
    typeof getAppointmentRoute
> = async (c) => {
    const appointmentId = c.req.param('id')
    const appointment = await findAppointmentById(appointmentId)

    if (!appointment) {
        return c.json(
            jsonResponse({}, 'Appointment not found', NOT_FOUND),
            NOT_FOUND,
        )
    }

    return c.json(jsonResponse(appointment, 'Appointment found', OK), OK)
}
