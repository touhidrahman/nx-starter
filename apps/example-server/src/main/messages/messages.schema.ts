import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { messagesTable } from '../../core/db/schema'

export type InsertMessage = typeof messagesTable.$inferInsert
export type SelectMessage = typeof messagesTable.$inferSelect

export const zInsertMessage = createInsertSchema(messagesTable, {
    vendorUserId: (schema) => schema.vendorUserId,
    clientUserId: (schema) => schema.clientUserId,
    readableByVendorGroup: (schema) => schema.readableByVendorGroup,
    readableByClientGroup: (schema) => schema.readableByClientGroup,
    date: (schema) => schema.date,
    replyByDate: (schema) => schema.replyByDate,
    message: (schema) => schema.message,
})

export const zSelectMessage = createSelectSchema(messagesTable)

export const zUpdateMessage = zInsertMessage.partial() // Allow partial updates

export const zDeleteMessage = z.object({
    messageIds: z.array(z.number()).min(1),
})
