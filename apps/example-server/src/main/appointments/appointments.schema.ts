import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { appointmentsTable } from '../../core/db/schema'

export type InsertAppointment = typeof appointmentsTable.$inferInsert
export type SelectAppointment = typeof appointmentsTable.$inferSelect

export const zInsertAppointment = createInsertSchema(appointmentsTable)

export const zSelectAppointment = createSelectSchema(appointmentsTable)

export const zUpdateAppointment = zInsertAppointment.partial() // Allow partial updates
