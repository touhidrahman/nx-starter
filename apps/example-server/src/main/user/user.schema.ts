import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { usersTable } from '../../core/db/schema'

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const zInsertUser = createInsertSchema(usersTable)
export const zSelectUser = createSelectSchema(usersTable)
