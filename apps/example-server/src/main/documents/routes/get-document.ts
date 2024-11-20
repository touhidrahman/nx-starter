import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { documentsTable } from '../../../core/db/schema'
import checkDocumentOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { findDocumentById } from '../documents.service'
import { zSelectDocument } from '../documents.schema'

export const getDocumentRoute = createRoute({
    path: '/v1/documents/:id',
    tags: ['Document'],
    method: 'get',
    middleware: [
        authMiddleware,
        checkDocumentOwnershipMiddleware(documentsTable, 'Document'),
    ],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectDocument),

            'Document details',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document not found'),
    },
})

export const getDocumentHandler: AppRouteHandler<
    typeof getDocumentRoute
> = async (c) => {
    const id = c.req.param('id')
    const document = await findDocumentById(id)

    if (!document) {
        return c.json(
            jsonResponse({}, 'Document not found', NOT_FOUND),
            NOT_FOUND,
        )
    }
    return c.json(
        { data: document, message: 'Document details', success: true },
        OK,
    )
}
