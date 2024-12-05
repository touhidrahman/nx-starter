import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK, FORBIDDEN } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser, zUpdateProfile } from '../user.schema'
import { updateProfile } from '../user.service'

export const updateUserProfileRoute = createRoute({
    path: '/v1/user/profile',
    method: 'put',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zUpdateProfile, 'Profile details to update'),
    },
    responses: {
        [OK]: ApiResponse(zSelectUser, 'Profile updated'),
        [FORBIDDEN]: ApiResponse(zEmpty, 'Unauthorized to update profile'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const updateUserProfileHandler: AppRouteHandler<
    typeof updateUserProfileRoute
> = async (c) => {
    const body = c.req.valid('json')
    const userPayload = await c.get('jwtPayload')
    const userId = userPayload?.sub

    if (!userId) {
        return c.json(
            {
                success: false,
                message: 'Unauthorized to update profile',
                data: {},
            },
            FORBIDDEN,
        )
    }

    // Call the service to update user
    const [updatedUser] = await updateProfile(userId, body, {
        restrictFields: ['email', 'password'],
    })

    if (!updatedUser) {
        return c.json(
            { success: false, message: 'User not found', data: {} },
            NOT_FOUND,
        )
    }

    return c.json(
        {
            success: true,
            message: 'Profile updated successfully',
            data: updatedUser,
        },
        OK,
    )
}
