import { createRouter } from '../../core/create-app'
import {
    createAppointmentHandler,
    createAppointmentRoute,
} from './routes/create-appointments'
import {
    deleteAppointmentHandler,
    deleteAppointmentRoute,
} from './routes/delete-appointments'
import {
    getAppointmentHandler,
    getAppointmentRoute,
} from './routes/get-appointment'
import {
    getAppointmentsHandler,
    getAppointmentsRoute,
} from './routes/get-appointments'
import {
    updateAppointmentHandler,
    updateAppointmentRoute,
} from './routes/update-appointments'

export const appointmentsV1Routes = createRouter()
    .openapi(createAppointmentRoute, createAppointmentHandler)
    .openapi(getAppointmentRoute, getAppointmentHandler)
    .openapi(getAppointmentsRoute, getAppointmentsHandler)
    .openapi(updateAppointmentRoute, updateAppointmentHandler)
    .openapi(deleteAppointmentRoute, deleteAppointmentHandler)

// import { zValidator } from '@hono/zod-validator'
// import { and, eq, getTableColumns } from 'drizzle-orm'
// import { Hono } from 'hono'
// import { db } from '../../core/db/db'
// import { appointmentsTable } from '../../core/db/schema'
// import { authMiddleware } from '../../core/middlewares/auth.middleware'
// import checkAppointmentOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
// import { zId, zIds } from '../../core/models/common.schema'
// import { zInsertAppointment, zUpdateAppointment } from './appointments.schema'

// const app = new Hono()

// // GET /appointments - list all
// app.get('', authMiddleware, async (c) => {
//     const payload = await c.get('jwtPayload')

//     try {
//         const groupId = payload.groupId
//         const appointments = await db
//             .select({ ...getTableColumns(appointmentsTable) })
//             .from(appointmentsTable)
//             .where(eq(appointmentsTable.groupId, groupId))
//             .limit(100)

//         return c.json({ data: appointments, message: 'Appointments list' })
//     } catch (error: any) {
//         return c.json(
//             { error: 'Internal server error', message: error.message },
//             500,
//         )
//     }
// })

// // GET /appointments/:id - find one
// app.get(
//     '/:id',
//     authMiddleware,
//     zValidator('param', zId),
//     checkAppointmentOwnershipMiddleware(appointmentsTable, 'Appointment'),
//     async (c) => {
//         const id = c.req.param('id')
//         const appointment = await db
//             .select({ ...getTableColumns(appointmentsTable) })
//             .from(appointmentsTable)
//             .where(eq(appointmentsTable.id, id))
//             .limit(1)

//         if (appointment.length === 0) {
//             return c.json({ message: 'Appointment not found' }, 404)
//         }

//         return c.json({ data: appointment[0], message: 'Appointment found' })
//     },
// )

// // POST /appointments - create one
// app.post(
//     '',
//     zValidator('json', zInsertAppointment),
//     authMiddleware,
//     async (c) => {
//         const body = c.req.valid('json')

//         const newAppointment = await db
//             .insert(appointmentsTable)
//             .values(body)
//             .returning()

//         return c.json({ data: newAppointment, message: 'Appointment created' })
//     },
// )

// // PATCH /appointments/:id - update
// app.patch(
//     '/:id',
//     zValidator('param', zId),
//     zValidator('json', zUpdateAppointment),
//     authMiddleware,
//     checkAppointmentOwnershipMiddleware(appointmentsTable, 'Appointment'),
//     async (c) => {
//         const id = c.req.param('id')
//         const body = c.req.valid('json')
//         const payload = await c.get('jwtPayload')

//         const updatedAppointment = await db
//             .update(appointmentsTable)
//             .set(body)
//             .where(
//                 and(
//                     eq(appointmentsTable.id, id),
//                     eq(appointmentsTable.groupId, payload.groupId),
//                 ),
//             )
//             .returning()

//         return c.json({
//             data: updatedAppointment,
//             message: 'Appointment updated',
//         })
//     },
// )

// // DELETE /appointments/:id - delete
// app.delete(
//     '/:id',
//     zValidator('param', zId),
//     authMiddleware,
//     checkAppointmentOwnershipMiddleware(appointmentsTable, 'Appointment'),
//     async (c) => {
//         const id = c.req.param('id')

//         await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id))

//         return c.json({ message: 'Appointment deleted' })
//     },
// )

// // DELETE /appointments - delete many
// app.delete('', zValidator('json', zIds), authMiddleware, async (c) => {
//     const body = c.req.valid('json')
//     const payload = await c.get('jwtPayload')

//     try {
//         for (const appointmentId of body.ids) {
//             await db
//                 .delete(appointmentsTable)
//                 .where(
//                     and(
//                         eq(appointmentsTable.id, appointmentId),
//                         eq(appointmentsTable.groupId, payload.groupId),
//                     ),
//                 )
//         }
//     } catch (error: any) {
//         return c.json(
//             { error: 'Internal server error', message: error.message },
//             500,
//         )
//     }

//     return c.json({ message: 'Appointments deleted' })
// })

// export default app
