import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '../../../core/create-app'
import { checkToken } from '../auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { zInsertGroup, zSelectGroup } from '../../group/group.schema'
import { BAD_REQUEST, CREATED, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { groupsTable } from '../../../core/db/schema'
import { and, count, eq } from 'drizzle-orm'
import { zEmpty } from '../../../core/models/common.schema'

export const createVendorProfileRoute = createRoute({
    path: '/v1/create-vendor-profile',
    method: 'post',
    tags: ['Auth'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertGroup, 'Group create input'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectGroup, 'Vendor profile created'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid input'),
    },
})

export const createVendorProfileHandler: AppRouteHandler<
    typeof createVendorProfileRoute
> = async (c) => {
    const body = c.req.valid('json')
    const { sub: authUserId } = await c.get('jwtPayload')
    // check if already a vendor
    const existingVendor = await db
        .select()
        .from(groupsTable)
        .where(eq(groupsTable.ownerId, authUserId))
        .limit(1)

    if (existingVendor.length > 0) {
        return c.json(
            { error: 'Vendor profile already exists', data: {} },
            BAD_REQUEST,
        )
    }

    const [group] = await db
        .insert(groupsTable)
        .values({
            ...body,
            ownerId: authUserId,
        })
        .returning()

    return c.json({ data: group, message: 'Vendor profile created' }, CREATED)
}
