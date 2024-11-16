import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { deleteSharing, findById } from '../documents-sharing.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const deleteDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing/:id',
    method: 'delete',
    tags: ['Document Sharing'],
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Document sharing deleted successfully',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Document sharing not found',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const deleteDocumentSharingHandler: AppRouteHandler<
    typeof deleteDocumentSharingRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const document = await findById(id)
        if (!document) {
            return c.json(
                jsonResponse({}, 'Document sharing not found', NOT_FOUND),
                NOT_FOUND,
            )
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
        return c.json(
            jsonResponse(
                {},
                'Failed to delete document sharing',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
