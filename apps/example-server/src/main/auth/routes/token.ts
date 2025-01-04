import { createRoute } from '@hono/zod-openapi'
import dayjs from 'dayjs'
import { BAD_REQUEST, OK } from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { findGroupById } from '../../group/group.service'
import { USER_LEVEL_ADMIN, USER_LEVEL_MODERATOR } from '../../user/user.schema'
import {
    findUserByEmail,
    getRoleByUserAndGroup,
    updateLastLogin,
} from '../auth.service'
import {
    createAccessToken,
    createRefreshToken,
    decodeRefreshToken,
} from '../token.util'

const tags = ['Auth']

export const getTokenRoute = createRoute({
    path: '/v1/token',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(
            z.object({ refreshToken: z.string() }),
            'Refresh token',
        ),
    },
    responses: {
        [OK]: ApiResponse(
            z.object({
                accessToken: z.string(),
                refreshToken: z.string(),
                lastLogin: z.string(),
            }),
            'New token generated',
        ),

        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid refresh token'),
    },
})

export const getTokenRouteHandler: AppRouteHandler<
    typeof getTokenRoute
> = async (c) => {
    const { refreshToken: incomingRefreshToken } = c.req.valid('json')
    const decoded = await decodeRefreshToken(incomingRefreshToken)

    if (!decoded) {
        return c.json(
            {
                message: 'Invalid or expired refresh token',
                data: {},
                success: false,
            },
            BAD_REQUEST,
        )
    }

    const user = await findUserByEmail(decoded.email)
    const refreshToken = await createRefreshToken(user, decoded.groupId)
    const now = dayjs()

    await updateLastLogin(user.id)

    // if previledged user, do not check for groups and just return access token
    // TODO: fix as any
    if ([USER_LEVEL_ADMIN, USER_LEVEL_MODERATOR].includes(user.level as any)) {
        const accessToken = await createAccessToken(user, 'admin')
        return c.json(
            {
                message: 'Priviledged user login successful',
                data: {
                    accessToken,
                    refreshToken,
                    lastLogin: now.toISOString(),
                },
                success: true,
            },
            OK,
        )
    }

    const group = await findGroupById(decoded.groupId)
    const role = await getRoleByUserAndGroup(user.id, group.id)
    const accessToken = await createAccessToken(user, role!.role, group)
    return c.json(
        {
            message: 'User login to provided group was successful',
            data: {
                accessToken,
                refreshToken,
                lastLogin: now.toISOString(),
            },
            success: true,
        },
        OK,
    )
}
