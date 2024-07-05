import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { courtsTable } from '../../core/db/schema'

export type InsertCourt = typeof courtsTable.$inferInsert
export type SelectCourt = typeof courtsTable.$inferSelect

export const zInsertCourt = createInsertSchema(courtsTable, {})

export const zSelectCourt = createSelectSchema(courtsTable)

export const zUpdateCourt = zInsertCourt.partial() // Allow partial updates

export const zDeleteCourt = z.object({
    courtIds: z.array(z.number()).min(1),
})
