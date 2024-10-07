import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { userRoleEnum, usersTable } from '../../core/db/schema'
import { z } from 'zod'

export type UserDto = typeof usersTable.$inferInsert
export type User = typeof usersTable.$inferSelect

export const zInsertUser = createInsertSchema(usersTable)
export const zSelectUser = createSelectSchema(usersTable)
export const zUpdateUser = createInsertSchema(usersTable).partial()
export const zSearchUser = zInsertUser
    .pick({
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        groupId: true,
        authUserId: true,
        city: true,
        country: true,
        postCode: true,
        role: true,
    })
    .extend({
        page: z.number().int().positive().optional(),
        size: z.number().int().positive().optional(),
    })
    .partial()
    .optional()

export const [ROLE_OWNER, ROLE_MANAGER, ROLE_MEMBER] = userRoleEnum.enumValues
