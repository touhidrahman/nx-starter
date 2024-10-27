import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { uploadsTable } from '../../core/db/schema'

export type UploadDto = typeof uploadsTable.$inferInsert
export type Upload = typeof uploadsTable.$inferSelect

export const zInsertUpload = createInsertSchema(uploadsTable, {})

export const zSelectUpload = createSelectSchema(uploadsTable)

export const zUpdateUpload = zInsertUpload.partial() // Allow partial updates
