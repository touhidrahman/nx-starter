import { createRoute, z } from '@hono/zod-openapi'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/dist/esm/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectDocument } from '../documents.schema'
import { zEmpty } from '../../../core/models/common.schema'
import { getFilesByGroupId } from '../documents.service'
import { AppBindings, AppRouteHandler } from '../../../core/core.type'

export const getFilesByGroupIdRoute = createRoute({
    path: '/v1/documents',
    tags: ['Document'],
    method: 'get',
    middleware: [],
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectDocument), 'List of documents'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'No document found!'),
    },
})

export const getFilesByGroupIdHanlder: AppRouteHandler<
    typeof getFilesByGroupIdRoute
> = async (c) => {
    const payload = await c.get('jwtPayload')
    try {
        const { groupId } = payload
        const files = await getFilesByGroupId(groupId)

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
