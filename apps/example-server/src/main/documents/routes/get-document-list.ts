import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectDocument } from '../documents.schema'
import { listDocumentsByGroup } from '../documents.service'

// TODO: fix. Need to add various filtering options such as by userId, by entityName, by groupId etc
export const getDocumentListRoute = createRoute({
    path: '/v1/documents',
    tags: ['Document'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectDocument), 'List of documents'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'No document found!'),
    },
})

export const getDocumentListHandler: AppRouteHandler<
    typeof getDocumentListRoute
> = async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const document = await listDocumentsByGroup(groupId)

        return c.json(
            { data: document, message: 'Document list', success: true },
            OK,
        )
    } catch (error: any) {
        return c.json(
            {
                success: false,
                message: 'Internal server error',
                error: error,
                data: {},
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
