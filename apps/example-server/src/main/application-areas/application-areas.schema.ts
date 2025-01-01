import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { applicationAreasTable } from '../../core/db/schema'
import { z } from 'zod'

export type InsertApplicationArea = typeof applicationAreasTable.$inferInsert
export type SelectApplicationArea = typeof applicationAreasTable.$inferSelect

export const zInsertApplicationArea = createInsertSchema(
    applicationAreasTable,
)

export const zSelectApplicationArea = createSelectSchema(applicationAreasTable)

export const zUpdateApplicationArea = zInsertApplicationArea.omit({ id: true })

export const zSearchApplicationArea = zSelectApplicationArea
    .pick({
        id: true,
        area: true,
        description: true,
    })
    .extend({
        page: z.number().int().positive().optional(),
        size: z.number().int().positive().optional(),
    })
    .partial()
