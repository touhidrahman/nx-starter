import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { groupsTable } from '../db/schema'

export type InsertGroup = typeof groupsTable.$inferInsert
export type SelectGroup = typeof groupsTable.$inferSelect

export const zInsertGroup = createInsertSchema(groupsTable, {
    email: (schema) => schema.email.email(),
    verifiedOn: z.coerce.date(),
})
export const zSelectGroup = createSelectSchema(groupsTable)
export const zUpdateGroup = zInsertGroup.omit({
    // public facing API cannot update these fields
    verified: true,
    verifiedOn: true,
})
