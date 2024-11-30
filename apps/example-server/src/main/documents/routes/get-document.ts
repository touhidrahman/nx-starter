import { createRoute, z } from '@hono/zod-openapi'
import { FORBIDDEN, NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectDocument } from '../documents.schema'
import { findDocumentById } from '../documents.service'

export const getDocumentRoute = createRoute({
    path: '/v1/documents/:id',
    tags: ['Document'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectDocument, 'Document details'),
        [FORBIDDEN]: ApiResponse(zEmpty, 'Document does not belong to user'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document not found'),
    },
})

// TODO: implement advanced permission system via document sharing
export const getDocumentHandler: AppRouteHandler<
    typeof getDocumentRoute
> = async (c) => {
    const id = c.req.param('id')
    const payload = await c.get('jwtPayload')
    const document = await findDocumentById(id)

    if (!document) {
        return c.json(
            { data: {}, message: 'Document not found', success: false },
            NOT_FOUND,
        )
    }

    if (document.userId && document.userId !== payload.userId) {
        // document does not belong to user
        return c.json(
            { data: {}, message: 'Document does not belong to the user', success: false },
            FORBIDDEN,
        )
    }

    return c.json(
        { data: document, message: 'Document details', success: true },
        OK,
    )
}
