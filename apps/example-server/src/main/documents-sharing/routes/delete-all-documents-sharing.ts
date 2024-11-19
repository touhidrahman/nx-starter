import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { deleteSharing } from '../documents-sharing.service'

export const deleteAllDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing',
    method: 'delete',
    tags: ['Document Sharing'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(
            z.object({ ids: z.array(z.string()) }),
            'Task details',
        ),
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

export const deleteAllDocumentSharingHandler: AppRouteHandler<
    typeof deleteAllDocumentSharingRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        for (const id of body.ids) {
            await deleteSharing(id)
        }
    } catch (error) {
        console.error(
            'Error deleting documents sharing:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Failed to delete documents sharing',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
    return c.json(
        jsonResponse({}, 'All Document Sharing deleted successfully', OK),
        OK,
    )
}
