import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { usersTable } from '../db/schema'

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export const zInsertUser = createInsertSchema(usersTable, {
    email: (schema) => schema.email.email(),
})
export const zSelectUser = createSelectSchema(usersTable)
export const zUpdateUser = zInsertUser.omit({
    email: true,
    password: true,
    id: true,
    type: true,
    verified: true,
})
