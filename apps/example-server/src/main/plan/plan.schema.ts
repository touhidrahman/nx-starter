import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { pricingPlanTable } from '../../core/db/schema'

export type InsertPlan = typeof pricingPlanTable.$inferInsert
export type SelectPlan = typeof pricingPlanTable.$inferSelect

export const zInsertPlan = createInsertSchema(pricingPlanTable)

export const zSelectPlan = createSelectSchema(pricingPlanTable).partial()

export const zUpdatePlan = zInsertPlan.partial() // Allow partial