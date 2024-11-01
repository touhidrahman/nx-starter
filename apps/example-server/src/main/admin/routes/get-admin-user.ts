import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectAdminUser } from '../admin-user.schema'
import { adminUserService } from '../admin-user.service'

export const getAdminUserRoute = createRoute({
    path: '/v1/admin-user/:id',
    method: 'get',
    tags: ['AdminUser'],
    middleware: [checkToken],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zSelectAdminUser, 'Admin user found'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Admin user not found'),
    },
})

export const getAdminUserHandler: AppRouteHandler<typeof getAdminUserRoute> = async (c) => {
    const userId = c.req.param('id')
    const userExists = await adminUserService.adminUserExists(userId)

    if (!userExists) {
        return c.json({ message: 'Admin user not found', data: {} }, NOT_FOUND)
    }

    const user = await adminUserService.getAdminUserById(userId)

    return c.json({ data: user, message: 'Admin user found' }, OK)
}
