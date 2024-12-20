import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectDocumentSharing } from '../documents-sharing.schema'
import { findById } from '../documents-sharing.service'
import { checkToken } from '../../auth/auth.middleware'

export const getDocumentSharingRoute = createRoute({
    path: '/v1/document-sharing/:id',
    tags: ['Document Sharing'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectDocumentSharing, 'Document sharing details'),
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
            { data: {}, message: 'Document sharing not found', success: false },
            NOT_FOUND,
        )
    }
    return c.json(
        { data: document, message: 'Document sharing details', success: true },
        OK,
    )
}
