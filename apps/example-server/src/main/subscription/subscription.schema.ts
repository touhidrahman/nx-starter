import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { subscriptionsTable } from '../../core/db/schema'
import { zInsertMessage } from '../messages/messages.schema'

export type InsertSubscription = typeof subscriptionsTable.$inferInsert
export type SelectSubscription = typeof subscriptionsTable.$inferSelect

export const zInsertSubscription = createInsertSchema(subscriptionsTable, {
    planId: (schema) => schema.planId.min(1), // Example: planId should have at least 1 character
})

export const zSelectSubscription = createSelectSchema(subscriptionsTable)

export const zUpdateSubscription = zInsertSubscription.partial() // Allow partial updates
