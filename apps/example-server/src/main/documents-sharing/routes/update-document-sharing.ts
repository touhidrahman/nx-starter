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
            zSelectDocumentSharing,

            'Document sharing updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document sharing data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document sharing not found'),
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
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }
        const [updatedDocumentSharing] = await update(id, body)

        return c.json(
            {
                data: updatedDocumentSharing,
                message: 'Document sharing updated successfully',
                success: true,
            },
            OK,
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
        console.error(
            'Error updating document sharing:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
