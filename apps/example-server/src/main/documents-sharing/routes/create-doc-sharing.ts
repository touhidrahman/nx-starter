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
import {
    zInsertDocumentSharing,
    zSelectDocumentSharing,
} from '../documents-sharing.schema'
import { create } from '../documents-sharing.service'

export const createDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing',
    method: 'post',
    tags: ['Document Sharing'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(zInsertDocumentSharing, 'Document Sharing details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            {
                data: zSelectDocumentSharing,
                message: z.string(),
                success: z.boolean(),
            },
            'Document sharing created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document sharing data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createDocumentSharingHandler: AppRouteHandler<
    typeof createDocumentSharingRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const document = await create(body)
        return c.json(
            jsonResponse(
                document,
                'Document sharing created successfully',
                CREATED,
            ),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse(
                    {},
                    'Invalid document sharing details',
                    BAD_REQUEST,
                ),
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Document sharing created  successfully',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
