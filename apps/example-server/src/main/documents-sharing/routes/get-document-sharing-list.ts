import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectDocumentSharing } from '../documents-sharing.schema'
import { listAll } from '../documents-sharing.service'

export const getDocumentSharingListRoute = createRoute({
    path: '/v1/document-sharing',
    tags: ['Document Sharing'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectDocumentSharing),

            'List of document sharing',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No document sharing found!'),
    },
})

export const getDocumentSharingListHandler: AppRouteHandler<
    typeof getDocumentSharingListRoute
> = async (c: any) => {
    try {
        const document = await listAll()

        return c.json({ data: document, message: 'Document sharing list' }, OK)
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            NOT_FOUND,
        )
    }
}
