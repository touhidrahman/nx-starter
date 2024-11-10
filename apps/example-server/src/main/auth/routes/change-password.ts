import { createRoute } from '@hono/zod-openapi'
import * as argon2 from 'argon2'
import { eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { authUsersTable } from '../../../core/db/schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zChangePassword } from '../auth.schema'
import { findAuthUserById } from '../auth.service'

const tags = ['Auth']

export const changePasswordRoute = createRoute({
    path: '/v1/change-password',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(zChangePassword, 'Change password details'),
    },
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(
            z.object({ success: z.boolean() }),
            'Password changed successfully',
        ),
        [HttpStatusCodes.UNAUTHORIZED]: ApiResponse(
            z.object({ success: z.boolean() }),
            'Unauthorized',
        ),
        [HttpStatusCodes.BAD_REQUEST]: ApiResponse(
            z.object({ success: z.boolean() }),
            'Current password does not match',
        ),
    },
})

export const changePasswordHandler: AppRouteHandler<
    typeof changePasswordRoute
> = async (c) => {
    const { userId } = c.req.valid('json')
    if (!userId) {
        return c.json(
            { message: 'Unauthorized', data: { success: false } },
            HttpStatusCodes.UNAUTHORIZED,
        )
    }

    const { currentPassword, password } = c.req.valid('json')

    const user = await findAuthUserById(userId)

    if (!user) {
        return c.json(
            { message: 'User not found', data: { success: false } },
            HttpStatusCodes.UNAUTHORIZED,
        )
    }

    // Verify the current password
    const currentPasswordMatches = await argon2.verify(
        user.password,
        currentPassword,
    )
    if (!currentPasswordMatches) {
        return c.json(
            {
                message: 'Current password does not match',
                data: { success: false },
            },
            HttpStatusCodes.BAD_REQUEST,
        )
    }

    // Hash the new password and update the database
    const hashedPassword = await argon2.hash(password)
    await db
        .update(authUsersTable)
        .set({ password: hashedPassword })
        .where(eq(authUsersTable.id, userId))

    return c.json({
        message: 'Password changed successfully',
        data: { success: true },
    })
}
