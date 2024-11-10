import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'

import { zEmpty } from '../../../core/models/common.schema'
import { zSelectDocument } from '../documents.schema'
import { listDocumentsByGroup } from '../documents.service'

export const getDocumentListRoute = createRoute({
    path: '/v1/documents',
    tags: ['Document'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectDocument), 'List of documents'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No document found!'),
    },
})

export const getDocumentListHandler: AppRouteHandler<
    typeof getDocumentListRoute
> = async (c: any) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const document = await listDocumentsByGroup(groupId)

        return c.json({ data: document, message: 'Document list' }, OK)
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            NOT_FOUND,
        )
    }
}
