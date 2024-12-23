import { createRoute } from '@hono/zod-openapi'
import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersTable } from '../../../core/db/schema'
import { LEVEL_ADMIN, LEVEL_MODERATOR } from '../../user/user.schema'
import {
    countUsersByAuthUserId,
    findFirstUserByAuthUserId,
    findUserByAuthUserIdAndGroupId,
} from '../../user/user.service'
import { zLogin } from '../auth.schema'
import { findAuthUserByEmail, updateLastLogin } from '../auth.service'
import { createAccessToken, createRefreshToken } from '../token.util'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { BAD_REQUEST, OK, PRECONDITION_REQUIRED } from 'stoker/http-status-codes'

const tags = ['Auth']

export const loginRoute = createRoute({
    path: '/v1/login',
    method: 'post',
    tags,
    request: {
        query: z.object({ groupId: z.string().optional() }),
        body: jsonContentRequired(zLogin, 'User login details'),
    },
    responses: {
        [OK]: ApiResponse(
            z.object({
                accessToken: z.string(),
                refreshToken: z.string(),
                lastLogin: z.string(),
            }),
            'User login successful',
        ),

        [BAD_REQUEST]: ApiResponse(
            zEmpty,
            'Invalid email or password',
        ),

        [PRECONDITION_REQUIRED]: ApiResponse(
            z.object({
                availableGroups: z.array(z.any()),
            }),
            'No group selected. Please select a group to continue',
        ),
    },
})

/**
 * Login uses primarily authUser table to authenticate user. If user is admin or moderator, access token is returned.
 * If user is not admin or moderator, user is asked to select a group to login to. If there is only one group the user is member of,
 * the user is logged in to that group by default.
 * @param c
 * @returns
 */
export const loginHandler: AppRouteHandler<typeof loginRoute> = async (c) => {
    const { email, password } = c.req.valid('json')
    // optional, group id. If provided, user is logged in to that group
    const groupId = c.req.query('groupId')

    const authUser = await findAuthUserByEmail(email)

    if (!authUser) {
        return c.json(
            { message: 'Invalid email or password', data: {}, success: false },
            BAD_REQUEST,
        )
    }

    const refreshToken = await createRefreshToken(authUser)
    const now = dayjs()

    if (!(await argon2.verify(authUser.password, password))) {
        return c.json(
            { message: 'Invalid email or password', data: {}, success: false },
            BAD_REQUEST,
        )
    }

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

    // if query param has group id, get the user profile belonging to that group
    if (groupId) {
        const user = await findUserByAuthUserIdAndGroupId(authUser.id, groupId)
        const group = user?.group
        const accessToken = await createAccessToken(
            authUser,
            user,
            group as any,
        ) // TODO: fix as any
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

    // if user has only one profile, consider it the default
    const userCount = await countUsersByAuthUserId(authUser.id)
    if (userCount === 1) {
        const user = await findFirstUserByAuthUserId(authUser.id)
        const group = user?.group
        const accessToken = await createAccessToken(
            authUser,
            user,
            group as any,
        ) // TODO: fix as any
        return c.json(
            {
                message: 'User login successful',
                data: {
                    accessToken,
                    refreshToken,
                    lastLogin: now.toISOString(),
                },
                success: true,
            },
            OK,
        )
    } else {
        // get all profiles of the user
        const usersWithGroups = await db.query.usersTable.findMany({
            where: eq(usersTable.authUserId, authUser.id),
            with: { group: true },
        })

        return c.json(
            {
                message: 'No group selected. Please select a group to continue',
                data: {
                    availableGroups: usersWithGroups.map((u) => u.group),
                },
                success: false,
            },
            PRECONDITION_REQUIRED,
        )
    }
}
