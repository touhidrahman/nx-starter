import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { subscriptionsTable } from '../../core/db/schema'

export type InsertSubscription = typeof subscriptionsTable.$inferInsert
export type SelectSubscription = typeof subscriptionsTable.$inferSelect

export const zInsertSubscription = createInsertSchema(subscriptionsTable, {
    planId: (schema) => schema.planId.min(1), //
}).omit({
    createdAt: true,
    updatedAt: true,
    id: true,
})

export const zSelectSubscription = createSelectSchema(subscriptionsTable)

export const zUpdateSubscription = zInsertSubscription.partial() // Allow partial updates
