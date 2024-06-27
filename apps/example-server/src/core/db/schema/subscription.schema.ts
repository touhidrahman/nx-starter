import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const subscriptionTable = pgTable('subscription', {
    id: serial('id').primaryKey(),
    currentPlan: text('current_plan').notNull(),
    isTrialing: boolean('is_trialing').notNull().default(true),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    autorenewal: boolean('autorenewal').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
})

export type InsertSubscription = typeof subscriptionTable.$inferInsert
export type SelectSubscription = typeof subscriptionTable.$inferSelect

export const zInsertSubscription = createInsertSchema(subscriptionTable, {
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
})
export const zSelectSubscription = createSelectSchema(subscriptionTable)
export const zUpdateSubscription = zInsertSubscription.omit({})
