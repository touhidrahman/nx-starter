import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { casesTable } from '../../core/db/schema'

export type InsertCase = typeof casesTable.$inferInsert
export type SelectCase = typeof casesTable.$inferSelect

export const zInsertCase = createInsertSchema(casesTable)

export const zSelectCase = createSelectSchema(casesTable)

export const zUpdateCase = zInsertCase.partial() // Allow partial updates
