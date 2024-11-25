import { createRoute, z } from '@hono/zod-openapi'
import { BAD_REQUEST, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectAppointment } from '../appointments.schema'
import { findAppointmentsByGroupId } from '../appointments.service'
import { zEmpty } from '../../../core/models/common.schema'

export const getAppointmentsRoute = createRoute({
    path: '/v1/appointments',
    method: 'get',
    tags: ['Appointment'],
    middleware: [checkToken] as const,
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectAppointment), 'List of Appointments'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Group ID is required'),
    },
})

export const getAppointmentsHandler: AppRouteHandler<
    typeof getAppointmentsRoute
> = async (c) => {
    const payload = await c.get('jwtPayload')
    const groupId = payload?.groupId

    if (!groupId) {
        return c.json(
            { success: true, message: 'Group ID is required', data: {} },
            BAD_REQUEST,
        )
    }

    const appointments = await findAppointmentsByGroupId(groupId)

    return c.json(
        { data: appointments, message: 'List of Appointments', success: true },
        OK,
    )
}
