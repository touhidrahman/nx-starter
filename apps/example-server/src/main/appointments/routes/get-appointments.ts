import { createRoute, z } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectAppointment } from '../appointments.schema'
import { appointmentService } from '../appointments.service'

export const getAppointmentsRoute = createRoute({
    path: '/v1/appointments',
    method: 'get',
    tags: ['Appointment'],
    middleware: [checkToken],
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectAppointment), 'List of Appointments'),
    },
})

export const getAppointmentsHandler: AppRouteHandler<
    typeof getAppointmentsRoute
> = async (c) => {
    const payload = await c.get('jwtPayload')
    const groupId = payload?.groupId

    if (!groupId) {
        return c.json({ message: 'Group ID is required', data: [] }, OK)
    }

    const appointments = await appointmentService.findAppointmentsByGroupId(
        groupId,
    )

    return c.json({ data: appointments, message: 'List of Appointments' }, OK)
}
