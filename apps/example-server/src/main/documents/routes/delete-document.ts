import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { deleteDocument, findDocumentById } from '../documents.service'
import { deleteS3File } from '../../../core/third-party/s3.service'
import { getFileNameFromUrl } from '../../../core/utils/file.util'

export const deleteDocumentRoute = createRoute({
    path: '/v1/documents/:id',
    method: 'delete',
    tags: ['Document'],
    middleware: [
        checkToken,
    ] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Document deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteDocumentHandler: AppRouteHandler<
    typeof deleteDocumentRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const document = await findDocumentById(id)
        if (!document) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        const fileKey = getFileNameFromUrl(document.url ?? '')
        if (fileKey) {
            await deleteS3File(fileKey)
        }

        await deleteDocument(id)
        return c.json(
            {
                data: {},
                message: 'Document deleted successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false, error },
            INTERNAL_SERVER_ERROR,
        )
    }
}
