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
import { checkToken } from '../../auth/auth.middleware'
import { zSelectDocument, zUpdateDocument } from '../documents.schema'
import { findDocumentById, updateDocument } from '../documents.service'

export const updateDocumentRoute = createRoute({
    path: '/v1/documents/:id',
    method: 'patch',
    tags: ['Document'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateDocument, 'Document details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectDocument, 'Document updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document not found'),
    },
})

export const updateDocumentHandler: AppRouteHandler<
    typeof updateDocumentRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        const existingDocument = await findDocumentById(id)
        if (!existingDocument) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }
        const [updatedDocument] = await updateDocument(
            id,
            payload.groupId,
            body,
        )

        return c.json(
            {
                data: updatedDocument,
                message: 'Document updated successfully',
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

        return c.json(
            {
                data: {},
                message: 'Internal Server Error',
                success: false,
                error,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
