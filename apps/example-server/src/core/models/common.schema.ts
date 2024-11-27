import { z, ZodObject, ZodSchema, ZodString, ZodType } from 'zod'

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

export const zMessage = z.object({
    message: z.string(),
})

export const zEmpty = z.object({})

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
export const zFile = z.object({
    file: z.custom<File>(
        (file) => {
            if (!(file instanceof File)) {
                return false
            }
            // Check file type (e.g., image/jpeg or image/png)
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
            if (!allowedTypes.includes(file.type)) {
                return false
            }
            if (file.size > MAX_FILE_SIZE) {
                return false
            }
            return true
        },
        {
            message: `Invalid file. Ensure it's an image (JPEG/PNG/PDF) and under ${MAX_FILE_SIZE / 1024 / 1024} MB.`,
        },
    ),
})
