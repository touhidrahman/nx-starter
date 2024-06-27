import { z } from 'zod'

// Define a schema for a date-time string
export const dateTimeStringSchema = z.string().refine(
    (val) => {
        // Check if the string is a valid date-time format
        return !isNaN(Date.parse(val))
    },
    {
        message: 'Invalid date-time string',
    },
)

export const idsSchema = z.object({
    ids: z.array(z.coerce.number()),
})
