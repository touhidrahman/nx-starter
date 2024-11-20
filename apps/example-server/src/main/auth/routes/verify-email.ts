import { createRoute } from '@hono/zod-openapi'
import { and, eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { authUsersTable } from '../../../core/db/schema'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { decodeVerificationToken } from '../token.util'

const tags = ['Auth']

export const verifyEmailRoute = createRoute({
    path: '/v1/verify-email/:token',
    method: 'post',
    tags,
    request: {
        params: z.object({ token: z.string() }),
    },
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(
            z.object({ id: z.string() }),

            'Email verified',
        ),
        [HttpStatusCodes.BAD_REQUEST]: ApiResponse(
            zEmpty,
            'Invalid or expired token',
        ),
    },
})

export const verifyEmailHandler: AppRouteHandler<
    typeof verifyEmailRoute
> = async (c) => {
    const { token } = c.req.valid('param')
    const decoded = await decodeVerificationToken(token)
    if (!decoded) {
        return c.json(
            { message: 'Invalid or expired token', data: {} },
            HttpStatusCodes.BAD_REQUEST,
        )
    }

    try {
        const [user] = await db
            .update(authUsersTable)
            .set({ verified: true })
            .where(
                and(
                    eq(authUsersTable.id, decoded.authUserId),
                    eq(authUsersTable.email, decoded.email),
                ),
            )
            .returning()

        return c.json(
            { message: 'Email verified', data: { id: user?.id } },
            HttpStatusCodes.OK,
        )
    } catch (error) {
        return c.json(
            { message: 'Invalid token', data: {} },
            HttpStatusCodes.BAD_REQUEST,
        )
    }
}
