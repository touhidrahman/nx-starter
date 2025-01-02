import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { usersTable, userLevelEnum } from '../../core/db/schema'
import { z } from 'zod'

export type AdminUserDto = typeof usersTable.$inferInsert
export type AdminUser = typeof usersTable.$inferSelect

export const zInsertAdminUser = createInsertSchema(usersTable).extend({
    level: z.literal(
        userLevelEnum.enumValues.find((level) => level === 'admin'),
    ),
})
export const zSelectAdminUser = createSelectSchema(usersTable)
export const zUpdateAdminUser = createInsertSchema(usersTable).partial()

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
