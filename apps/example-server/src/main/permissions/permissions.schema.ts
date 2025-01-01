import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { permissionsTable } from '../../core/db/schema'

export type InsertPermission = typeof permissionsTable.$inferInsert
export type SelectPermission = typeof permissionsTable.$inferSelect

export const zInsertPermission = createInsertSchema(permissionsTable, {
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
                access: z.number(),
            }),
        )
        .min(1),
})
