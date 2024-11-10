import { z, ZodObject, ZodString, ZodType } from 'zod'

export const ApiResponse: <T extends ZodType<unknown>>(
    schema: T,
    description: string,
) => {
    content: {
        'application/json': {
            schema: ZodObject<{
                data: T
                message: ZodString
            }>
        }
    }
    description: string
} = (schema, description) => ({
    content: {
        'application/json': {
            schema: z.object({
                data: schema,
                message: z.string(),
            }),
        },
    },
    description,
})
