import {
    z,
    ZodAny,
    ZodBoolean,
    ZodObject,
    ZodSchema,
    ZodString,
    ZodType,
    ZodUndefined,
} from 'zod'

export const ApiResponse: <T extends ZodSchema>(
    dataSchema: T,
    description: string,
) => {
    content: {
        'application/json': {
            schema: ZodObject<{
                data: ZodSchema
                message: ZodString
                success: ZodBoolean
                error: ZodAny
            }>
        }
    }
    description: string
} = (dataSchema, description) => ({
    content: {
        'application/json': {
            schema: z.object({
                data: dataSchema,
                message: z.string(),
                success: z.boolean(),
                error: z.any(),
            }),
        },
    },
    description,
})
