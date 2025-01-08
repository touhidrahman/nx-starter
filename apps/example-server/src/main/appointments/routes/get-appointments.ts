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
    request: {
        query: z.object({
            search: z.string().optional(),
            page: z.string().optional(),
            size: z.string().optional(),
            orderBy: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectAppointment), 'List of Appointments'),
        // [BAD_REQUEST]: ApiResponse(zEmpty, 'Something error occurred'),
    },
})

export const getAppointmentsHandler: AppRouteHandler<
    typeof getAppointmentsRoute
> = async (c) => {
    const { groupId } = await c.get('jwtPayload')
    const { search, page, size, orderBy } = c.req.query()

    const pageNumber = Number(page)
    const limitNumber = Number(size)

    const { data, meta } = await findAppointmentsByGroupId({
        groupId,
        search,
        page: pageNumber,
        size: limitNumber,
        orderBy,
    })

    return c.json(
        {
            data: data,
            pagination: {
                page: meta.page,
                size: meta.size,
                total: meta.totalCount,
            },
            message: 'Appointment list',
            success: true,
        },
        OK,
    )
}
