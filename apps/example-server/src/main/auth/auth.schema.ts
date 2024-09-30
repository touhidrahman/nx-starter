import { z } from 'zod'
import { authUsersTable, userLevelEnum } from '../../core/db/schema'
import { createInsertSchema } from 'drizzle-zod'

export const zLogin = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const zRegister = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    level: z.enum(userLevelEnum.enumValues).optional().default('user'),
})

export const zChangePassword = z.object({
    userId: z.coerce.number(),
    currentPassword: z.string(),
    password: z.string().min(8).max(32),
})

export const zForgotPassword = z.object({
    email: z.string().email(),
})

export const zResetPassword = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
})

export const zInsertAuthUser = createInsertSchema(authUsersTable, {
    email: (schema) => schema.email.email(),
})

export const zUpdateAuthUser = zInsertAuthUser.omit({
    email: true,
    password: true,
    id: true,
    level: true,
    verified: true,
})

export type InsertAuthUser = typeof authUsersTable.$inferInsert
export type SelectAuthUser = typeof authUsersTable.$inferSelect
