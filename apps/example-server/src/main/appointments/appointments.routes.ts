import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { toInt } from 'radash'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { appointmentsTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkAppointmentOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import {
    zDeleteAppointment,
    zInsertAppointment,
    zUpdateAppointment,
} from './appointments.schema'

const app = new Hono()

// GET /appointments - list all
app.get('', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = toInt(payload.groupId)
        const appointments = await db
            .select({ ...getTableColumns(appointmentsTable) })
            .from(appointmentsTable)
            .where(eq(appointmentsTable.groupId, groupId))
            .limit(100)

        return c.json({ data: appointments, message: 'Appointments list' })
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }
})

// GET /appointments/:id - find one
app.get(
    '/:id',
    authMiddleware,
    zValidator('param', z.object({ id: z.coerce.number() })),
    checkAppointmentOwnershipMiddleware(appointmentsTable, 'Appointment'),
    async (c) => {
        const id = c.req.param('id')
        const appointment = await db
            .select({ ...getTableColumns(appointmentsTable) })
            .from(appointmentsTable)
            .where(eq(appointmentsTable.id, id))
            .limit(1)

        if (appointment.length === 0) {
            return c.json({ message: 'Appointment not found' }, 404)
        }

        return c.json({ data: appointment[0], message: 'Appointment found' })
    },
)

// POST /appointments - create one
app.post(
    '',
    zValidator('json', zInsertAppointment),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newAppointment = await db
            .insert(appointmentsTable)
            .values(body)
            .returning()

        return c.json({ data: newAppointment, message: 'Appointment created' })
    },
)

// PATCH /appointments/:id - update
app.patch(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator('json', zUpdateAppointment),
    authMiddleware,
    checkAppointmentOwnershipMiddleware(appointmentsTable, 'Appointment'),
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedAppointment = await db
            .update(appointmentsTable)
            .set(body)
            .where(
                and(
                    eq(appointmentsTable.id, id),
                    eq(appointmentsTable.groupId, payload.groupId),
                ),
            )
            .returning()

        return c.json({
            data: updatedAppointment,
            message: 'Appointment updated',
        })
    },
)

// DELETE /appointments/:id - delete
app.delete(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    authMiddleware,
    checkAppointmentOwnershipMiddleware(appointmentsTable, 'Appointment'),
    async (c) => {
        const id = c.req.param('id')

        await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id))

        return c.json({ message: 'Appointment deleted' })
    },
)

// DELETE /appointments - delete many
app.delete(
    '',
    zValidator('json', zDeleteAppointment),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        try {
            for (const appointmentId of body.appointmentIds) {
                await db
                    .delete(appointmentsTable)
                    .where(
                        and(
                            eq(appointmentsTable.id, appointmentId),
                            eq(appointmentsTable.groupId, payload.groupId),
                        ),
                    )
            }
        } catch (error: any) {
            return c.json(
                { error: 'Internal server error', message: error.message },
                500,
            )
        }

        return c.json({ message: 'Appointments deleted' })
    },
)

export default app
