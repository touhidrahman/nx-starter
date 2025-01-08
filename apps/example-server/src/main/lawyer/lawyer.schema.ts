import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { lawyerTable } from '../../core/db/schema'

export type InsertLawyer = typeof lawyerTable.$inferInsert
export type SelectLawyer = typeof lawyerTable.$inferSelect

export const zInsertLawyer = createInsertSchema(lawyerTable)

export const zSelectLawyer = createSelectSchema(lawyerTable).partial()

export const zUpdateLawyer = zInsertLawyer.partial() // Allow partial
