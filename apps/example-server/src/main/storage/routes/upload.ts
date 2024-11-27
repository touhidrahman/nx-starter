import { createRoute, z } from '@hono/zod-openapi'
import { CREATED } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { uploadToS3AndGetUrl } from '../../../core/third-party/s3.service'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import {
    SelectStorage,
    zInsertStorage,
    zUploadStorage,
} from '../storage.schema'
import { createStorageRecord } from '../storage.service'

export const uploadRoute = createRoute({
    path: '/v1/storage/upload',
    tags: ['Storage'],
    method: 'post',
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zUploadStorage, 'Storage Item'),
    },
    responses: {
        [CREATED]: ApiResponse(
            z.array(zInsertStorage),
            'Storage Item(s) uploaded',
        ),
    },
})

export const uploadHandler: AppRouteHandler<typeof uploadRoute> = async (c) => {
    const body = await c.req.parseBody({ all: true })
    const payload = c.get('jwtPayload')
    const fileOrFiles = body['file']
    const entityId = body.entityId as string
    const entityName = body.entityName as string
    const results: SelectStorage[] = []

    if (fileOrFiles instanceof Array) {
        for await (const f of fileOrFiles) {
            const file = f as File
            const url = await uploadToS3AndGetUrl(file)
            const [item] = await createStorageRecord({
                file,
                url,
                entityName,
                entityId,
                uploadedBy: payload.sub,
            })
            results.push(item)
        }
    } else {
        const file = fileOrFiles as File
        const url = await uploadToS3AndGetUrl(file)
        const [item] = await createStorageRecord({
            file,
            url,
            entityName,
            entityId,
            uploadedBy: payload.sub,
        })
        results.push(item)
    }

    return c.json(
        { data: results, message: 'Files uploaded', success: true },
        CREATED,
    )
}
