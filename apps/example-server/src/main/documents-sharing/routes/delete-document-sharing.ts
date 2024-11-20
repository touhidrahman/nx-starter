import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { deleteSharing, findById } from '../documents-sharing.service'

export const deleteDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing/:id',
    method: 'delete',
    tags: ['Document Sharing'],
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Document sharing deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document sharing not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteDocumentSharingHandler: AppRouteHandler<
    typeof deleteDocumentSharingRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const document = await findById(id)
        if (!document) {
            return c.json({ data: {}, message: 'Item not found', success: false }, NOT_FOUND)

        }

        await deleteSharing(id)
        return c.json(
            jsonResponse('', 'Document sharing deleted successfully', OK),
            OK,
        )
    } catch (error) {
        console.error(
            'Error deleting document sharing :',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
            return c.json({ data: {}, message: 'Internal Server Error', success: false }, INTERNAL_SERVER_ERROR)

    }
}
