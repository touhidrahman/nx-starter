import { createRoute } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { createRouter } from '../../../core/create-app'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUsersByAuthUserId } from '../user.service'

const route = createRoute({
    path: '/v1/my-profiles',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken] as const,
    responses: {
        [OK]: ApiResponse(zSelectUser, 'List of user profiles by auth user ID'),
    },
})

export const getMyProfilesRoute = createRouter().openapi(route, async (c) => {
    const payload = c.get('jwtPayload')
    const [users] = await findUsersByAuthUserId(payload.sub)

    return c.json(
        {
            data: users,
            message: 'List of user profiles by auth user ID',
            success: true,
        },
        OK,
    )
})
