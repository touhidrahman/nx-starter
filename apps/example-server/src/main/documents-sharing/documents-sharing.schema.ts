import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { documentSharingTable } from '../../core/db/schema'

export type InsertDocumentSharing = typeof documentSharingTable.$inferInsert
export type SelectDocumentSharing = typeof documentSharingTable.$inferSelect

export const zInsertDocumentSharing = createInsertSchema(documentSharingTable)

export const zSelectDocumentSharing = createSelectSchema(documentSharingTable)

export const zUpdateDocumentSharing = zInsertDocumentSharing.partial() // Allow partial updates

export const zDeleteDocumentSharing = z.object({
    documentSharingIds: z.array(z.number()).min(1),
})
