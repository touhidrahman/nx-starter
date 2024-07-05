import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { appointmentsTable } from '../../core/db/schema'

export type InsertAppointment = typeof appointmentsTable.$inferInsert
export type SelectAppointment = typeof appointmentsTable.$inferSelect

export const zInsertAppointment = createInsertSchema(appointmentsTable, {
    date: (schema) => schema.date,
    vendorUserId: (schema) => schema.vendorUserId,
    clientUserId: (schema) => schema.clientUserId,
    startTimestamp: (schema) => schema.startTimestamp,
    endTimestamp: (schema) => schema.endTimestamp,
    groupId: (schema) => schema.groupId,
})

export const zSelectAppointment = createSelectSchema(appointmentsTable)

export const zUpdateAppointment = zInsertAppointment.partial() // Allow partial updates

export const zDeleteAppointment = z.object({
    appointmentIds: z.array(z.number()).min(1),
})
