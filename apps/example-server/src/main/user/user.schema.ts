import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { authUsersTable } from '../../core/db/schema'

export type InsertUser = typeof authUsersTable.$inferInsert
export type SelectUser = typeof authUsersTable.$inferSelect

export const zInsertUser = createInsertSchema(authUsersTable, {
    email: (schema) => schema.email.email(),
})
export const zSelectUser = createSelectSchema(authUsersTable)
export const zUpdateUser = zInsertUser.omit({
    email: true,
    password: true,
    id: true,
    type: true,
    verified: true,
})
