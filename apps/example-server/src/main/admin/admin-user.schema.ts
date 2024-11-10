import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { authUsersTable, userLevelEnum } from '../../core/db/schema'
import { z } from 'zod'

export type AdminUserDto = typeof authUsersTable.$inferInsert
export type AdminUser = typeof authUsersTable.$inferSelect

export const zInsertAdminUser = createInsertSchema(authUsersTable).extend({
    level: z.literal(
        userLevelEnum.enumValues.find((level) => level === 'admin'),
    ),
})
export const zSelectAdminUser = createSelectSchema(authUsersTable)
export const zUpdateAdminUser = createInsertSchema(authUsersTable).partial()

export const zSearchAdminUser = zSelectAdminUser
    .pick({
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        verified: true,
        createdAt: true,
    })
    .extend({
        page: z.number().int().positive().optional(),
        size: z.number().int().positive().optional(),
    })
    .partial()
