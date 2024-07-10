import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { eventsTable } from '../../core/db/schema'

export type InsertEvent = typeof eventsTable.$inferInsert
export type SelectEvent = typeof eventsTable.$inferSelect

export const zInsertEvent = createInsertSchema(eventsTable)

export const zSelectEvent = createSelectSchema(eventsTable)

export const zUpdateEvent = zInsertEvent.partial() // Allow partial updates

export const zDeleteEvent = z.object({
    eventIds: z.array(z.number()).min(1),
})
