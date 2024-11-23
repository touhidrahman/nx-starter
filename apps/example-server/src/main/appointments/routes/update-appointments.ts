import { createRoute, z } from '@hono/zod-openapi'
import {
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zUpdateAppointment, zSelectAppointment } from '../appointments.schema'
import { findAppointmentById, updateAppointment } from '../appointments.service'

export const updateAppointmentRoute = createRoute({
    path: '/v1/appointments/:id',
    method: 'put',
    tags: ['Appointment'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateAppointment, 'Appointment update details'),
    },
    responses: {
        [OK]: ApiResponse(
            zSelectAppointment,
            'Appointment updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid appointment data'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Appointment not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const updateAppointmentHandler: AppRouteHandler<
    typeof updateAppointmentRoute
> = async (c) => {
    const appointmentId = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingAppointment = await findAppointmentById(appointmentId)
        if (!existingAppointment) {
            return c.json(
                { data: {}, message: 'Appointment not found', success: false },
                NOT_FOUND,
            )
        }

        const [updatedAppointment] = await updateAppointment(
            appointmentId,
            body,
        )
        return c.json(
            {
                data: updatedAppointment,
                message: 'Appointment updated successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Invalid appointment data',
                    success: false,
                    error: error.errors,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating appointment:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            {
                data: {},
                message: 'Failed to update appointment',
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
