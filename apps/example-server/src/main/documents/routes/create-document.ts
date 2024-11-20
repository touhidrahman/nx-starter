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
            zSelectDocument,
            'Document created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createDocumentHandler: AppRouteHandler<
    typeof createDocumentRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const [document] = await createDocument(body)
        return c.json(
            {
                data: document,
                message: 'Document created successfully',
                success: true,
            },
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Bad request',
                    success: false,
                    error: error.errors,
                },
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
