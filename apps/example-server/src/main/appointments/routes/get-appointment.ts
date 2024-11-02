import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectAppointment } from '../appointments.schema'
import { appointmentService } from '../appointments.service'

export const getAppointmentRoute = createRoute({
    path: '/v1/appointment/:id',
    method: 'get',
    tags: ['Appointment'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectAppointment, 'Appointment found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Appointment not found'),
    },
})

export const getAppointmentHandler: AppRouteHandler<
    typeof getAppointmentRoute
> = async (c) => {
    const appointmentId = c.req.param('id')
    const appointment = await appointmentService.findAppointmentById(
        appointmentId,
    )

    if (!appointment) {
        return c.json({ message: 'Appointment not found', data: {} }, NOT_FOUND)
    }

    return c.json({ data: appointment, message: 'Appointment found' }, OK)
}
