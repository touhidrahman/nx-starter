import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { documentsTable } from '../../core/db/schema'
import { zFile } from '../../core/models/common.schema'

export type InsertDocument = typeof documentsTable.$inferInsert
export type SelectDocument = typeof documentsTable.$inferSelect

export const zInsertDocument = createInsertSchema(documentsTable)
export const zUploadDocument = z
    .object({
        filename: z.string().optional(),
        entityName: z.string().optional().default(''),
        entityId: z.string().optional().default(''),
        folder: z.string().optional().default(''),
        description: z.string().optional().default(''),
    })
    .merge(zFile)

export const zSelectDocument = createSelectSchema(documentsTable).extend({
    pagination: z
        .object({
            page: z.number().optional(),
            size: z.number().optional(),
            total: z.number().optional(),
        })
        .optional(),
})

export const zUpdateDocument = zInsertDocument.partial()
