import { createRoute, z } from '@hono/zod-openapi'
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty, zFile } from '../../../core/models/common.schema'
import {
    deleteS3File,
    uploadToS3AndGetUrl,
} from '../../../core/third-party/s3.service'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectDocument } from '../documents.schema'
import { findDocumentById, updateDocument } from '../documents.service'

export const replaceFileRoute = createRoute({
    path: '/v1/documents/:id/upload',
    method: 'post',
    tags: ['Document'],
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zFile, 'Upload file(s)'),
    },
    responses: {
        [OK]: ApiResponse(zSelectDocument, 'Document updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Document not found'),
    },
})

export const replaceFileHandler: AppRouteHandler<
    typeof replaceFileRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = await c.req.parseBody({ all: true })
    const fileOrFiles = body['file'] ?? body['files']
    const file = (
        Array.isArray(fileOrFiles) ? fileOrFiles[0] : fileOrFiles
    ) as File
    const payload = await c.get('jwtPayload')

    try {
        const existingDocument = await findDocumentById(id)
        if (!existingDocument) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        // delete previous document
        if (existingDocument) {
            const fileKey = existingDocument.url.split('/').pop()
            fileKey && (await deleteS3File(fileKey))
        }

        // upload new document
        const url = await uploadToS3AndGetUrl(file)
        const [updatedDocument] = await updateDocument(id, payload.groupId, {
            url,
        })

        return c.json(
            {
                data: updatedDocument,
                message: 'Document updated successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Bad request',
                    success: false,
                    error: error.errors,
                },
                BAD_REQUEST,
            )
        }

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
}
