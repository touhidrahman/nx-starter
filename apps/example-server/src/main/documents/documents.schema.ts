import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { documentsTable } from '../../core/db/schema'

export type InsertDocument = typeof documentsTable.$inferInsert
export type SelectDocument = typeof documentsTable.$inferSelect

export const zInsertDocument = createInsertSchema(documentsTable, {
    filename: (schema) => schema.filename,
    url: (schema) => schema.url,
    mimetype: (schema) => schema.mimetype,
    size: (schema) => schema.size,
    linkedEntity: (schema) => schema.linkedEntity,
    linkedId: (schema) => schema.linkedId,
    description: (schema) => schema.description.optional(),
    groupId: (schema) => schema.groupId,
})

export const zSelectDocument = createSelectSchema(documentsTable)

export const zUpdateDocument = zInsertDocument.partial() // Allow partial updates

export const zDeleteDocument = z.object({
    documentIds: z.array(z.number()).min(1),
})
