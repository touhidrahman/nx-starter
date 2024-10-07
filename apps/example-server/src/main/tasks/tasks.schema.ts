import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { tasksTable } from '../../core/db/schema'

export type InsertTask = typeof tasksTable.$inferInsert
export type SelectTask = typeof tasksTable.$inferSelect

export const zInsertTask = createInsertSchema(tasksTable, {
    todo: (schema) => schema.todo.min(1), // Example: todo should have at least 1 character
    status: (schema) => schema.status.optional(), // Optional status
})

export const zSelectTask = createSelectSchema(tasksTable)

export const zUpdateTask = zInsertTask.omit({
    createdAt: true,
    updatedAt: true,
})

export const zDeleteTask = z.object({
    taskIds: z.array(z.string()).min(1),
})
