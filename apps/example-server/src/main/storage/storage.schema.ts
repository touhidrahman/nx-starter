import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { storageTable } from '../../core/db/schema'
import { zFile } from '../../core/models/common.schema'

export type InsertStorage = typeof storageTable.$inferInsert
export type SelectStorage = typeof storageTable.$inferSelect

export const zInsertStorage = createInsertSchema(storageTable)
export const zSelectStorage = createSelectSchema(storageTable)

export const zUpdateStorage = zInsertStorage
    .omit({
        createdAt: true,
        updatedAt: true,
    })
    .partial()
export const zUploadStorage = zUpdateStorage.merge(zFile)
export type UpdateStorage = z.infer<typeof zUpdateStorage>

export const zDeleteStorage = z.object({
    ids: z.array(z.string()).min(1),
})
