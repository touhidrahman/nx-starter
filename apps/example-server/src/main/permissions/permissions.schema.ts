import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { permissionsTable } from '../../core/db/schema'

export type InsertPermission = typeof permissionsTable.$inferInsert
export type SelectPermission = typeof permissionsTable.$inferSelect

export const zInsertPermission = createInsertSchema(permissionsTable, {
    // You can add custom validation here if needed
    area: (schema) => schema.area.min(1), // Example: area should have at least 1 character
    access: (schema) => schema.access.min(0).max(5), // Example: access level between 0 and 5
})

export const zSelectPermission = createSelectSchema(permissionsTable)

export const zUpdatePermission = zInsertPermission.omit({
    groupId: true,
    role: true,
    area: true,
})

export const zDeletePermission = z.object({
    permissions: z
        .array(
            z.object({
                groupId: z.string(),
                role: z.string(),
                area: z.string(),
            }),
        )
        .min(1),
})
