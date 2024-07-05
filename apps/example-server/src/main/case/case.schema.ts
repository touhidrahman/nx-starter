import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { casesTable } from '../../core/db/schema'

export type InsertCase = typeof casesTable.$inferInsert
export type SelectCase = typeof casesTable.$inferSelect

export const zInsertCase = createInsertSchema(casesTable, {
    number: (schema) => schema.number,
    name: (schema) => schema.name,
    defendant: (schema) => schema.defendant,
    plaintiffName: (schema) => schema.plaintiffName,
    plaintiffGroupId: (schema) => schema.plaintiffGroupId,
    groupId: (schema) => schema.groupId,
    court: (schema) => schema.court,
})

export const zSelectCase = createSelectSchema(casesTable)

export const zUpdateCase = zInsertCase.partial() // Allow partial updates

export const zDeleteCase = z.object({
    caseIds: z.array(z.number()).min(1),
})
