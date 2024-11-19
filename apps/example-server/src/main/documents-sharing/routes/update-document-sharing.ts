import { createRoute, z } from '@hono/zod-openapi'
import {
    BAD_REQUEST,
    OK,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import {
    zSelectDocumentSharing,
    zUpdateDocumentSharing,
} from '../documents-sharing.schema'
import { findById, update } from '../documents-sharing.service'

export const updateDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing/:id',
    method: 'patch',
    tags: ['Document Sharing'],
    middleware: [authMiddleware],
    request: {
        param: z.object({ id: z.string() }),
        body: jsonContent(zUpdateDocumentSharing, 'Document sharing details'),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: zSelectDocumentSharing,
                message: z.string(),
                success: z.boolean(),
            },
            'Document sharing updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid document sharing data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Document sharing not found',
        ),
    },
})

export const updateDocumentSharingHandler: AppRouteHandler<
    typeof updateDocumentSharingRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')

    try {
        const existingDocumentSharing = await findById(id)
        if (!existingDocumentSharing) {
            return c.json(
                jsonResponse({}, 'Document sharing not found', NOT_FOUND),
                NOT_FOUND,
            )
        }
        const updatedDocumentSharing = await update(id, body)

        return c.json(
            jsonResponse(
                updatedDocumentSharing,
                'Document sharing created successfully',
                OK,
            ),
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid document sharing data', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating document sharing:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to update document sharing',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
