import { createRoute } from '@hono/zod-openapi'
import dayjs from 'dayjs'
import { BAD_REQUEST, OK } from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { LEVEL_ADMIN, LEVEL_MODERATOR } from '../../user/user.schema'
import { findUserByAuthUserIdAndGroupId } from '../../user/user.service'
import { findAuthUserByEmail, updateLastLogin } from '../auth.service'
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

    const authUser = await findAuthUserByEmail(decoded.email)
    const refreshToken = await createRefreshToken(authUser, decoded.groupId)
    const now = dayjs()

    await updateLastLogin(authUser.id)

    // if previledged user, do not check for groups and just return access token
    // TODO: fix as any
    if ([LEVEL_ADMIN, LEVEL_MODERATOR].includes(authUser.level as any)) {
        const accessToken = await createAccessToken(authUser)
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

    const user = await findUserByAuthUserIdAndGroupId(
        authUser.id,
        decoded.groupId,
    )
    const group = user?.group
    const accessToken = await createAccessToken(authUser, user, group as any) // TODO: fix as any
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
