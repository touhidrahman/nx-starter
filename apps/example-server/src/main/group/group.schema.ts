import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { groupsTable } from '../../core/db/schema'

export type GroupDto = typeof groupsTable.$inferInsert
export type Group = typeof groupsTable.$inferSelect

export const zInsertGroup = createInsertSchema(groupsTable, {
    email: (schema) => schema.email.email(),
    verifiedOn: z.coerce.date().optional(),
    ownerId: z.string().optional(),
})
export const zSelectGroup = createSelectSchema(groupsTable).partial()
export const zUpdateGroup = zInsertGroup.omit({
    // public facing API cannot update these fields
    verified: true,
    verifiedOn: true,
})

export const zUpdateUserRole = z.object({
    userId: z.string(),
    role: z.string(),
})
