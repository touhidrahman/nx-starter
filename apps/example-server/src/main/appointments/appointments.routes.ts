import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { appointmentsTable } from '../../core/db/schema'
import {
    zDeleteAppointment,
    zInsertAppointment,
    zUpdateAppointment,
} from './appointments.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /appointments - list all
app.get('', authMiddleware, async (c) => {
    const appointments = await db
        .select({ ...getTableColumns(appointmentsTable) })
        .from(appointmentsTable)
        .limit(100)

    return c.json({ data: appointments, message: 'Appointments list' })
})

// GET /appointments/:id - find one
app.get('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const appointment = await db
        .select({ ...getTableColumns(appointmentsTable) })
        .from(appointmentsTable)
        .where(eq(appointmentsTable.id, id))
        .limit(1)

    if (appointment.length === 0) {
        return c.json({ message: 'Appointment not found' }, 404)
    }

    return c.json({ data: appointment[0], message: 'Appointment found' })
})

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
    zValidator('json', zUpdateAppointment),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedAppointment = await db
            .update(appointmentsTable)
            .set(body)
            .where(eq(appointmentsTable.id, id))
            .returning()

        return c.json({
            data: updatedAppointment,
            message: 'Appointment updated',
        })
    },
)

// DELETE /appointments/:id - delete
app.delete('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id))

    return c.json({ message: 'Appointment deleted' })
})

// DELETE /appointments - delete many
app.delete(
    '',
    zValidator('json', zDeleteAppointment),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const appointmentId of body.appointmentIds) {
            await db
                .delete(appointmentsTable)
                .where(eq(appointmentsTable.id, appointmentId))
        }

        return c.json({ message: 'Appointments deleted' })
    },
)

export default app
