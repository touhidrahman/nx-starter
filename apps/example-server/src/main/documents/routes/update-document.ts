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
import checkDocumentOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { documentsTable } from '../../../core/db/schema'
import { zSelectDocument, zUpdateDocument } from '../documents.schema'
import { findDocumentById, updateDocument } from '../documents.service'

export const updateDocumentRoute = createRoute({
    path: '/v1/documents/:id',
    method: 'patch',
    tags: ['Document'],
    middleware: [
        authMiddleware,
        checkDocumentOwnershipMiddleware(documentsTable, 'Document'),
    ],
    request: {
        param: z.object({ id: z.string() }),
        body: jsonContent(zUpdateDocument, 'Document details'),
    },
    responses: {
        [OK]: ApiResponse(
            zSelectDocument,

            'Document updated successfully',
        ),
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
                jsonResponse({}, 'Document not found', NOT_FOUND),
                NOT_FOUND,
            )
        }
        const updatedDocument = await updateDocument(id, payload.groupId, body)

        return c.json(
            jsonResponse(updatedDocument, 'Document created successfully', OK),
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json({ data: {}, message: 'Bad request', success: false, error: error.errors }, BAD_REQUEST)

        }
        console.error(
            'Error updating document:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
            return c.json({ data: {}, message: 'Internal Server Error', success: false }, INTERNAL_SERVER_ERROR)

    }
}
