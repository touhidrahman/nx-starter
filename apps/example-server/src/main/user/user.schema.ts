import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import {
    userLevelEnum,
    userRoleEnum,
    usersTable,
    userStatusEnum,
} from '../../core/db/schema'
import { z } from 'zod'

export type UserDto = typeof usersTable.$inferInsert
export type User = typeof usersTable.$inferSelect

export const zInsertUser = createInsertSchema(usersTable)
export const zSelectUser = createSelectSchema(usersTable)
export const zUpdateUser = createInsertSchema(usersTable).partial()
export const zSearchUser = zSelectUser
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

export const [ROLE_OWNER, ROLE_MANAGER, ROLE_MEMBER] = userRoleEnum.enumValues
export const [LEVEL_USER, LEVEL_MODERATOR, LEVEL_ADMIN] =
    userLevelEnum.enumValues
export const [USER_STATUS_ACTIVE, USER_STATUS_INACTIVE, USER_STATUS_BANNED] =
    userStatusEnum.enumValues

export const zUpdateProfile = createSelectSchema(usersTable).omit({
    email: true,
})

export const zProfilePicture = z.object({
    file: z.instanceof(File).optional(),
})
