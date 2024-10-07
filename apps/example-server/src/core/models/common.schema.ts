import { z } from 'zod'

// Define a schema for a date-time string
export const zDateTimeString = z.string().refine(
    (val) => {
        // Check if the string is a valid date-time format
        return !isNaN(Date.parse(val))
    },
    {
        message: 'Invalid date-time string',
    },
)

export const zIds = z.object({
    ids: z.array(z.string()).min(1),
})

export const zId = z.object({
    id: z.string(),
})
