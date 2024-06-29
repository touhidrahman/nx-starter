import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { subscriptionTable } from '../../core/db/schema'

export type InsertSubscription = typeof subscriptionTable.$inferInsert
export type SelectSubscription = typeof subscriptionTable.$inferSelect

export const zInsertSubscription = createInsertSchema(subscriptionTable, {
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
})
export const zSelectSubscription = createSelectSchema(subscriptionTable)
export const zUpdateSubscription = zInsertSubscription.omit({})
