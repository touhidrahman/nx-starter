import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { documentSharingTable } from '../../core/db/schema'

export type InsertDocumentSharing = typeof documentSharingTable.$inferInsert
export type SelectDocumentSharing = typeof documentSharingTable.$inferSelect

export const zInsertDocumentSharing = createInsertSchema(documentSharingTable, {
    senderGroupId: (schema) => schema.senderGroupId,
    receiverGroupId: (schema) => schema.receiverGroupId,
    documentId: (schema) => schema.documentId,
    senderUserId: (schema) => schema.senderUserId,
    receiverUserId: (schema) => schema.receiverUserId,
    expiryDate: (schema) => schema.expiryDate,
})

export const zSelectDocumentSharing = createSelectSchema(documentSharingTable)

export const zUpdateDocumentSharing = zInsertDocumentSharing.partial() // Allow partial updates

export const zDeleteDocumentSharing = z.object({
    documentSharingIds: z.array(z.number()).min(1),
})
