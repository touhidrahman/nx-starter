import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteAppointment, findAppointmentById } from '../appointments.service'

export const deleteAppointmentRoute = createRoute({
    path: '/v1/appointments/:id',
    method: 'delete',
    tags: ['Appointment'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Appointment deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Appointment not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteAppointmentHandler: AppRouteHandler<
    typeof deleteAppointmentRoute
> = async (c) => {
    const appointmentId = c.req.param('id')

    try {
        const appointment = await findAppointmentById(appointmentId)
        if (!appointment) {
            return c.json(
                { data: {}, message: 'Appointment not found', success: false },
                NOT_FOUND,
            )
        }

        await deleteAppointment(appointmentId)
        return c.json(
            {
                data: {},
                message: 'Appointment deleted successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting appointment:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal server error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
