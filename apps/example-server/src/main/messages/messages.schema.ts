import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { messagesTable } from '../../core/db/schema'

export type InsertMessage = typeof messagesTable.$inferInsert
export type SelectMessage = typeof messagesTable.$inferSelect

export const zInsertMessage = createInsertSchema(messagesTable)

export const zSelectMessage = createSelectSchema(messagesTable)

export const zUpdateMessage = zInsertMessage.partial() // Allow partial updates
