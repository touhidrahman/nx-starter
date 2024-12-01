import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { zSelectDocument } from '../documents.schema'
import { getFilesByEntityNameAndEntityId } from '../documents.service'

export const getFilesByEntityNameAndIdRoute = createRoute({
    path: '/v1/documents',
    tags: ['Document'],
    method: 'get',
    middleware: [] as const,
    request: {
        query: z.object({
            entityName: z.string().optional(),
            entityId: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectDocument), 'List of documents'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'No document found!'),
    },
})

export const getFilesByEntityNameAndIdHandler: AppRouteHandler<
    typeof getFilesByEntityNameAndIdRoute
> = async (c) => {
    const { entityName, entityId } = await c.req.query()

    try {
        const files = await getFilesByEntityNameAndEntityId(
            entityName,
            entityId,
        )

        return c.json(
            { data: files, message: 'Document list', success: true },
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
