import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { checkToken } from '../../auth/auth.middleware'
import {
    SelectDocument,
    zInsertDocument,
    zSelectDocument,
    zUploadDocument,
} from '../documents.schema'
import { createDocument } from '../documents.service'
import { uploadToS3AndGetUrl } from '../../../core/third-party/s3.service'

export const createDocumentRoute = createRoute({
    path: '/v1/documents',
    method: 'post',
    tags: ['Document'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zUploadDocument, 'Document details and file(s)'),
    },
    responses: {
        [CREATED]: ApiResponse(
            z.array(zSelectDocument),
            'Files uploaded and Document created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid document data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createDocumentHandler: AppRouteHandler<
    typeof createDocumentRoute
> = async (c) => {
    const body = await c.req.parseBody({ all: true })
    const payload = c.get('jwtPayload')
    const fileOrFiles = body['file'] ?? body['files']
    const entityId = body.entityId as string
    const entityName = body.entityName as string
    const folder = body.folder as string
    const description = body.description as string
    const results: SelectDocument[] = []

    try {
        if (fileOrFiles instanceof Array) {
            for await (const f of fileOrFiles) {
                const file = f as File
                const url = await uploadToS3AndGetUrl(file)
                const [item] = await createDocument({
                    file,
                    url,
                    entityName,
                    entityId,
                    folder,
                    description,
                    userId: payload.userId,
                    groupId: payload.groupId,
                })
                results.push(item)
            }
        } else {
            const file = fileOrFiles as File
            const url = await uploadToS3AndGetUrl(file)
            const [item] = await createDocument({
                file,
                url,
                entityName,
                entityId,
                folder,
                description,
                userId: payload.userId,
                groupId: payload.groupId,
            })
            results.push(item)
        }
        return c.json(
            {
                data: results,
                message: 'Documents uploaded successfully',
                success: true,
            },
            CREATED,
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
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
