import { z } from '@hono/zod-openapi'
import {
    ZodAny,
    ZodBoolean,
    ZodNumber,
    ZodObject,
    ZodOptional,
    ZodString,
    ZodUndefined,
} from 'zod'
export type ZodSchema = z.AnyZodObject | z.ZodArray<z.AnyZodObject>

export function ApiResponse<T extends ZodSchema>(
    dataSchema: T,
    description: string,
): {
    content: {
        'application/json': {
            schema: ZodObject<{
                data: T
                message: ZodString
                success: ZodBoolean
                error: ZodAny
                meta: ZodAny
                pagination: ZodOptional<
                    ZodObject<{
                        page: ZodNumber
                        size: ZodNumber
                        total: ZodNumber
                    }>
                >
            }>
        }
    }
    description: string
} {
    return {
        content: {
            'application/json': {
                schema: z.object({
                    data: dataSchema,
                    message: z.string(),
                    success: z.boolean(),
                    error: z.any(),
                    meta: z.any(),
                    pagination: z
                        .object({
                            page: z.number(),
                            size: z.number(),
                            total: z.number(),
                        })
                        .optional(),
                }),
            },
        },
        description,
    }
}

// export const ApiResponse: <T extends ZodSchema>(
//     dataSchema: T,
//     description: string,
// ) => {
//     content: {
//         'application/json': {
//             schema: ZodObject<{
//                 data: T
//                 message: ZodString
//                 success: ZodBoolean
//                 error: ZodAny
//                 meta: ZodAny
//                 pagination: ZodObject<{
//                     page: ZodNumber,
//                     size: ZodNumber,
//                     total: ZodNumber,
//                 }> | ZodUndefined
//             }>
//         }
//     }
//     description: string
// } = (dataSchema, description) => ({
//     content: {
//         'application/json': {
//             schema: z.object({
//                 data: dataSchema,
//                 message: z.string(),
//                 success: z.boolean(),
//                 error: z.any(),
//                 meta: z.any(),
//                 pagination: z.object({
//                     page: z.number(),
//                     size: z.number(),
//                     total: z.number(),
//                 })
//             }),
//         },
//     },
//     description,
// })
