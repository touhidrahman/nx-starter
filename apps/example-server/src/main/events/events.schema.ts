import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { eventsTable } from '../../core/db/schema'

export type InsertEvent = typeof eventsTable.$inferInsert
export type SelectEvent = typeof eventsTable.$inferSelect

export const zInsertEvent = createInsertSchema(eventsTable, {
    date: (schema) => schema.date,
    userId: (schema) => schema.userId,
    startTimestamp: (schema) => schema.startTimestamp,
    endTimestamp: (schema) => schema.endTimestamp,
    groupId: (schema) => schema.groupId,
    caseId: (schema) => schema.caseId,
    description: (schema) => schema.description.optional(),
    showMeAs: (schema) => schema.showMeAs,
    wholeDay: (schema) => schema.wholeDay,
    status: (schema) => schema.status,
})

export const zSelectEvent = createSelectSchema(eventsTable)

export const zUpdateEvent = zInsertEvent.partial() // Allow partial updates

export const zDeleteEvent = z.object({
    eventIds: z.array(z.number()).min(1),
})
