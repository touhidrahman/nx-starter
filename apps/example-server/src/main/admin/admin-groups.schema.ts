import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { groupsTable } from '../../core/db/schema'

export type InsertGroup = typeof groupsTable.$inferInsert
export type SelectGroup = typeof groupsTable.$inferSelect

export const zInsertGroup = createInsertSchema(groupsTable)
export const zSelectGroup = createSelectSchema(groupsTable)
export const zUpdateGroup = zInsertGroup.partial() // Allow partial updates
