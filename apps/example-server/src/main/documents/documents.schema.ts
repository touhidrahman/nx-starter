import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { documentsTable } from '../../core/db/schema'

export type InsertDocument = typeof documentsTable.$inferInsert
export type SelectDocument = typeof documentsTable.$inferSelect

export const zInsertDocument = createInsertSchema(documentsTable)

export const zSelectDocument = createSelectSchema(documentsTable)

export const zUpdateDocument = zInsertDocument.partial() // Allow partial updates
