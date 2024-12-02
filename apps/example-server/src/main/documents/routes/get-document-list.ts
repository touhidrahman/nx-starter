import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectDocument } from '../documents.schema'
import { getAllDocuments, listDocumentsByGroup } from '../documents.service'
import { checkToken } from '../../auth/auth.middleware'

export const getDocumentsListRoute = createRoute({
    path: '/v1/documents',
    tags: ['Document'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        query: z.object({
            entityName: z.string().optional(),
            entityId: z.string().optional(),
            search: z.string().optional(),
            page: z.number().min(1).optional().default(1),
            limit: z.number().min(1).max(100).optional().default(10),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectDocument), 'List of documents'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'No document found!'),
    },
})

export const getDocumentsListHandler: AppRouteHandler<
    typeof getDocumentsListRoute
> = async (c) => {
    const payload = await c.get('jwtPayload')
    const { entityName, entityId, search, page, limit } = await c.req.query()

    try {
        const { groupId } = payload
        const documents = await getAllDocuments({
            entityName,
            entityId,
            groupId,
            search,
            page,
            limit,
        })

        return c.json(
            { data: documents, message: 'Documents list', success: true },
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
