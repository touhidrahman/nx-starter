import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { applicationAreasTable } from '../../core/db/schema'

export type InsertApplicationArea = typeof applicationAreasTable.$inferInsert
export type SelectApplicationArea = typeof applicationAreasTable.$inferSelect

export const zInsertApplicationArea = createInsertSchema(
    applicationAreasTable,
    {
        area: (schema) => schema.area.min(1, 'Area is required'),
    },
)

export const zSelectApplicationArea = createSelectSchema(applicationAreasTable)

export const zUpdateApplicationArea = zInsertApplicationArea.omit({ id: true })
