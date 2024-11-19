import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectDocumentSharing } from '../documents-sharing.schema'
import { findById } from '../documents-sharing.service'

export const getDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing/:id',
    tags: ['Document Sharing'],
    method: 'get',
    middleware: [authMiddleware],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectDocumentSharing),
                message: z.string(),
                success: z.boolean(),
            },
            'Document sharing details',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document sharing not found'),
    },
})

export const getDocumentSharingHandler: AppRouteHandler<
    typeof getDocumentSharingRoute
> = async (c) => {
    const id = c.req.param('id')
    const document = await findById(id)

    if (!document) {
        return c.json(
            jsonResponse({}, 'Document sharing not found', NOT_FOUND),
            NOT_FOUND,
        )
    }
    return c.json(jsonResponse(document, 'Document sharing details', OK), OK)
}
