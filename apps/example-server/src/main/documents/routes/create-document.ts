import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zInsertDocument, zSelectDocument } from '../documents.schema'
import { createDocument } from '../documents.service'

export const createDocumentRoute = createRoute({
    path: '/v1/documents',
    method: 'post',
    tags: ['Document'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zInsertDocument, 'Document details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            {
                data: zSelectDocument,
                message: z.string(),
                success: z.boolean(),
            },
            'Document created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid document data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const createDocumentHandler: AppRouteHandler<
    typeof createDocumentRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const document = await createDocument(body)
        return c.json(
            jsonResponse(document, 'Document created successfully', CREATED),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid document details', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Document created successfully',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
