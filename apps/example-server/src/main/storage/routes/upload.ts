import { createRoute, z } from '@hono/zod-openapi'
import { CREATED, NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty, zId } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import {
    SelectStorage,
    zInsertStorage,
    zSelectStorage,
    zUploadStorage,
} from '../storage.schema'
import { getStorageItemById } from '../storage.service'
import { jsonContent } from 'stoker/openapi/helpers'
import { uploadToS3AndGetUrl } from '../../../core/third-party/s3.service'
import { db } from '../../../core/db/db'
import { storageTable } from '../../../core/db/schema'
import { getFileType } from '../storage.util'

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

    if (fileOrFiles instanceof Array) {
        const results: SelectStorage[] = []
        for await (const f of fileOrFiles) {
            const file = f as File
            const url = await uploadToS3AndGetUrl(file)
            const [item] = await db
                .insert(storageTable)
                .values({
                    filename: file.name,
                    url,
                    type: getFileType(file),
                    size: file.size,
                    extension: file.name.split('.').pop(),
                    entityId,
                    entityName,
                    uploadedBy: payload.sub,
                })
                .returning()
            results.push(item)
        }
        return c.json(
            { data: results, message: 'File uploaded', success: true },
            CREATED,
        )
    } else {
        const file = fileOrFiles as File
        const url = await uploadToS3AndGetUrl(file)
        const [item] = await db
            .insert(storageTable)
            .values({
                filename: file.name,
                url,
                type: getFileType(file),
                extension: file.name.split('.').pop(),
                entityId,
                entityName,
                uploadedBy: payload.sub,
            })
            .returning()
        return c.json(
            { data: [item], message: 'File uploaded', success: true },
            CREATED,
        )
    }
}
