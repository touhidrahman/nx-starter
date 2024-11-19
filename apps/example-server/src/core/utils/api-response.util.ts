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

type OpenApiJsonResponseSpec = {
    content: {
        'application/json': {
            schema: ZodObject<{
                data: ZodSchema
                message: ZodString
                success: ZodBoolean
                error: ZodAny | ZodUndefined
            }>
        }
    }
    description: string
}

export const ApiResponse: <T extends ZodSchema>(
    schema: {
        data: T
        error?: ZodAny
        success: ZodBoolean
        message: ZodString
    },
    description: string,
) => OpenApiJsonResponseSpec = (schema, description) => ({
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

export const SuccessResponse: <T extends ZodSchema>(
    dataSchema: T,
    description: string,
) => OpenApiJsonResponseSpec = (dataSchema, description) => ({
    content: {
        'application/json': {
            schema: z.object({
                data: dataSchema,
                message: z.string(),
                success: z.boolean(),
                error: z.undefined(),
            }),
        },
    },
    description,
})

export const FailureResponse: <T extends ZodSchema>(
    dataSchema: T,
    description: string,
) => OpenApiJsonResponseSpec = (dataSchema, description) => ({
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
