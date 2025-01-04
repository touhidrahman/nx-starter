import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import {
    groupTypeEnum,
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
        city: true,
        country: true,
        postCode: true,
    })
    .extend({
        page: z.number().int().positive().optional(),
        size: z.number().int().positive().optional(),
        status: z.enum(userStatusEnum.enumValues).optional(),
        groupType: z.enum(groupTypeEnum.enumValues).optional(),
        level: z.enum(userLevelEnum.enumValues).optional(),
        search: z.string().optional(),
    })
    .partial()

export const [USER_ROLE_ADMIN, USER_ROLE_MANAGER, USER_ROLE_MEMBER] =
    userRoleEnum.enumValues
export const [USER_LEVEL_USER, USER_LEVEL_MODERATOR, USER_LEVEL_ADMIN] =
    userLevelEnum.enumValues
export const [USER_STATUS_ACTIVE, USER_STATUS_INACTIVE, USER_STATUS_BANNED] =
    userStatusEnum.enumValues

export const zUpdateProfile = createSelectSchema(usersTable).omit({
    email: true,
})

export const zProfilePicture = z.object({
    file: z.instanceof(File).optional(),
})
