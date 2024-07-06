import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { profileTable } from '../../core/db/schema'

export type InsertProfile = typeof profileTable.$inferInsert
export type SelectProfile = typeof profileTable.$inferSelect

export const zInsertProfile = createInsertSchema(profileTable, {
    userId: (schema) => schema.userId,
    coverPhoto: (schema) => schema.coverPhoto,
    address: (schema) => schema.address,
    phone: (schema) => schema.phone,
    email: (schema) => schema.email,
    url: (schema) => schema.url,
    bio: (schema) => schema.bio,
})

export const zSelectProfile = createSelectSchema(profileTable)

export const zUpdateProfile = zInsertProfile.partial() // Allow partial updates

export const zDeleteProfile = z.object({
    profileIds: z.array(z.number()).min(1),
})
