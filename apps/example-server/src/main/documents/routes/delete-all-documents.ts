import { createRoute, z } from '@hono/zod-openapi'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { deleteS3File } from '../../../core/third-party/s3.service'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { getFileNameFromUrl } from '../../../core/utils/file.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteDocument, findDocumentById } from '../documents.service'

export const deleteAllDocumentRoute = createRoute({
    path: '/v1/documents',
    method: 'delete',
    tags: ['Document'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(
            z.object({ ids: z.array(z.string()) }),
            'Document IDs to delete',
        ),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Documents deleted successfully'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteAllDocumentHandler: AppRouteHandler<
    typeof deleteAllDocumentRoute
> = async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')
    const toDelete: string[] = []

    try {
        for (const id of body.ids) {
            const document = await findDocumentById(id)
            if (
                document.userId === payload.userId &&
                document.groupId === payload.groupId
            ) {
                const fileKey = getFileNameFromUrl(document.url ?? '')
                fileKey && (await deleteS3File(fileKey))
                toDelete.push(id)
                await deleteDocument(id)
            }
        }
    } catch (error) {
        return c.json(
            {
                data: {},
                message: 'Internal Server Error',
                success: false,
                error,
            },
            INTERNAL_SERVER_ERROR,
        )
    }

    return c.json(
        { data: {}, message: 'Documents deleted successfully', success: true },
        OK,
    )
}
