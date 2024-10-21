import { createRoute, z } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../user.schema'
import { findUsersByAuthUserId } from '../user.service'

export const getMyProfilesRoute = createRoute({
    path: '/v1/my-profiles',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken],
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectUser),
            'List of user profiles by auth user ID',
        ),
    },
})

export const getMyProfilesHandler: AppRouteHandler<
    typeof getMyProfilesRoute
> = async (c) => {
    const payload = c.get('jwtPayload')
    const users = await findUsersByAuthUserId(payload.sub)

    return c.json(
        { data: users, message: 'List of user profiles by auth user ID' },
        OK,
    )
}
