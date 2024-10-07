import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { storageTable } from '../../core/db/schema'

export type InsertStorage = typeof storageTable.$inferInsert
export type SelectStorage = typeof storageTable.$inferSelect

export const zInsertStorage = createInsertSchema(storageTable, {})

export const zSelectStorage = createSelectSchema(storageTable)

export const zUpdateStorage = zInsertStorage.partial() // Allow partial updates
