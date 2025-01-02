import { createRoute } from '@hono/zod-openapi'
import { and, eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersTable } from '../../../core/db/schema'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { decodeVerificationToken } from '../token.util'
import { BAD_REQUEST, OK } from 'stoker/http-status-codes'

const tags = ['Auth']

export const verifyEmailRoute = createRoute({
    path: '/v1/verify-email/:token',
    method: 'post',
    tags,
    request: {
        params: z.object({ token: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(z.object({ id: z.string() }), 'Email verified'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid or expired token'),
    },
})

export const verifyEmailHandler: AppRouteHandler<
    typeof verifyEmailRoute
> = async (c) => {
    const { token } = c.req.valid('param')
    const decoded = await decodeVerificationToken(token)
    if (!decoded) {
        return c.json(
            { message: 'Invalid or expired token', data: {}, success: false },
            BAD_REQUEST,
        )
    }

    try {
        const [user] = await db
            .update(usersTable)
            .set({ verified: true })
            .where(
                and(
                    eq(usersTable.id, decoded.authUserId),
                    eq(usersTable.email, decoded.email),
                ),
            )
            .returning()

        return c.json(
            {
                success: true,
                message: 'Email verified',
                data: { id: user?.id },
            },
            OK,
        )
    } catch (error) {
        return c.json(
            { message: 'Invalid token', success: false, data: {} },
            BAD_REQUEST,
        )
    }
}
