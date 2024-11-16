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
        [HttpStatusCodes.OK]: ApiResponse(
            {
                data: z.object({
                    accessToken: z.string(),
                    refreshToken: z.string(),
                    lastLogin: z.string(),
                }),
                message: z.string(),
                success: z.boolean(),
            },

            'User login successful',
        ),

        [HttpStatusCodes.BAD_REQUEST]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Invalid email or password',
        ),

        [HttpStatusCodes.PRECONDITION_REQUIRED]: ApiResponse(
            {
                data: z.object({
                    availableGroups: z.array(z.any()),
                }),
                message: z.string(),
                success: z.boolean(),
            },
            'No group selected. Please select a group to continue',
        ),
    },
})

export type LoginRoute = typeof loginRoute

export const loginHandler: AppRouteHandler<LoginRoute> = async (c) => {
    const { email, password } = c.req.valid('json')
    const groupId = c.req.query('groupId')

    const authUser = await findAuthUserByEmail(email)

    if (!authUser) {
        return c.json(
            { message: 'Invalid email or password', data: {} },
            HttpStatusCodes.BAD_REQUEST,
        )
    }

    const refreshToken = await createRefreshToken(authUser)
    const now = dayjs()

    if (!(await argon2.verify(authUser.password, password))) {
        return c.json(
            { message: 'Invalid email or password', data: {} },
            HttpStatusCodes.BAD_REQUEST,
        )
    }

    await updateLastLogin(authUser.id)

    // if previledged user, return access token
    if ([LEVEL_ADMIN, LEVEL_MODERATOR].includes(authUser.level as any)) {
        const accessToken = await createAccessToken(authUser)
        // TODO: fix as any
        return c.json(
            {
                message: 'Priviledged user login successful',
                data: {
                    accessToken,
                    refreshToken,
                    lastLogin: now.toISOString(),
                },
            },
            HttpStatusCodes.OK,
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
                message: 'User login to group successful',
                data: {
                    accessToken,
                    refreshToken,
                    lastLogin: now.toISOString(),
                },
            },
            HttpStatusCodes.OK,
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
            },
            HttpStatusCodes.OK,
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
            },
            HttpStatusCodes.PRECONDITION_REQUIRED,
        )
    }
}
