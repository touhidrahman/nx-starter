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
    schema: {
        data: T
        error?: ZodAny
        success: ZodBoolean
        message: ZodString
    },
    description: string,
) => {
    content: {
        'application/json': {
            schema: ZodObject<{
                data: T
                message: ZodString
                success: ZodBoolean
                error: ZodAny | ZodUndefined
            }>
        }
    }
    description: string
} = (schema, description) => ({
    content: {
        'application/json': {
            schema: z.object({
                data: schema.data,
                message: z.string(),
                success: z.boolean(),
                error: schema.error ?? z.undefined(),
            }),
        },
    },
    description,
})
