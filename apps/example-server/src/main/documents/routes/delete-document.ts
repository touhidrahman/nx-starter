import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { documentsTable } from '../../../core/db/schema'
import checkDocumentOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { deleteDocument, findDocumentById } from '../documents.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const deleteDocumentRoute = createRoute({
    path: '/v1/documents/:id',
    method: 'delete',
    tags: ['Document'],
    middleware: [
        authMiddleware,
        checkDocumentOwnershipMiddleware(documentsTable, 'Document'),
    ],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Document deleted successfully',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Document not found',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const deleteDocumentHandler: AppRouteHandler<
    typeof deleteDocumentRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const document = await findDocumentById(id)
        if (!document) {
            return c.json(
                jsonResponse({}, 'Document not found', NOT_FOUND),
                NOT_FOUND,
            )
        }

        await deleteDocument(id)
        return c.json(jsonResponse('', 'Document deleted successfully', OK), OK)
    } catch (error) {
        console.error(
            'Error deleting task:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to delete document',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
