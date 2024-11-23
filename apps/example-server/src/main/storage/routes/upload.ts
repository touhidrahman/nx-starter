import { createRoute } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty, zId } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectStorage } from '../storage.schema'
import { getStorageItemById } from '../storage.service'

export const uploadRoute = createRoute({
    path: '/v1/storage/upload',
    tags: ['Storage'],
    method: 'post',
    middleware: [checkToken] as const,
    request: {
        body: {
            entityId: z.string,
            entityName: z.string,
            file: z.any,
        },
    },
})
