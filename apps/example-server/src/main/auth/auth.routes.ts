import { createRoute } from '@hono/zod-openapi'
import * as argon2 from 'argon2'
import { and, eq } from 'drizzle-orm'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../core/core.type'
import { createRouter } from '../../core/create-app'
import { db } from '../../core/db/db'
import { authUsersTable } from '../../core/db/schema'
import { zEmpty } from '../../core/models/common.schema'
import { zChangePassword, zResetPassword } from './auth.schema'
import { findAuthUserByEmail, findAuthUserById } from './auth.service'
import { loginHandler, loginRoute } from './login.routes'
import { registerHandler, registerRoute } from './register.routes'
import { createVerficationToken, decodeVerificationToken } from './token.util'
import { ApiResponse } from '../../core/utils/api-response.util'

const tags = ['Auth']

export const verifyEmailRoute = createRoute({
    path: '/v1/verify-email/:token',
    method: 'post',
    tags,
    request: {
        params: z.object({ token: z.string() }),
    },
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(zEmpty, 'Email verified'),
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
        await db
            .update(authUsersTable)
            .set({ verified: true })
            .where(
                and(
                    eq(authUsersTable.id, decoded.authUserId),
                    eq(authUsersTable.email, decoded.email),
                ),
            )

        return c.json(
            { message: 'Email verified', data: {} },
            HttpStatusCodes.OK,
        )
    } catch (error) {
        return c.json(
            { message: 'Invalid token', data: {} },
            HttpStatusCodes.BAD_REQUEST,
        )
    }
}

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

export const forgotPasswordRoute = createRoute({
    path: '/v1/forgot-password',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(
            z.object({ email: z.string().email() }),
            'Email',
        ),
    },
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(zEmpty, 'Password reset email sent'),
        [HttpStatusCodes.NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const forgotPasswordHandler: AppRouteHandler<
    typeof forgotPasswordRoute
> = async (c) => {
    const { email } = c.req.valid('json')
    const user = await findAuthUserByEmail(email)

    if (!user) {
        return c.json(
            { message: 'User not found', data: {} },
            HttpStatusCodes.NOT_FOUND,
        )
    }

    const token = await createVerficationToken(email, user.id.toString(), {
        unit: 'day',
        value: 7,
    })
    // TODO send the token to the user via email
    console.log(`Password reset token for ${email}: ${token}`)

    return c.json({ message: 'Password reset email sent', data: {} })
}

export const resetPasswordRoute = createRoute({
    path: '/v1/reset-password/:token',
    method: 'post',
    tags,
    request: {
        params: z.object({ token: z.string() }),
        body: jsonContentRequired(zResetPassword, 'New password'),
    },
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(zEmpty, 'Password reset success'),
        [HttpStatusCodes.BAD_REQUEST]: ApiResponse(
            zEmpty,
            'Error resetting password',
        ),
    },
})

export const resetPasswordHandler: AppRouteHandler<
    typeof resetPasswordRoute
> = async (c) => {
    const { email, password } = c.req.valid('json')
    const token = c.req.query('token') ?? ''
    const user = await findAuthUserByEmail(email)
    const decoded = await decodeVerificationToken(token)

    if (!decoded || !user || user.id !== decoded.authUserId) {
        return c.json(
            { message: 'Invalid token', data: {} },
            HttpStatusCodes.BAD_REQUEST,
        )
    }

    if (user) {
        const hashedPassword = await argon2.hash(password)
        await db
            .update(authUsersTable)
            .set({ password: hashedPassword })
            .where(eq(authUsersTable.id, user.id))
        // TODO send a confirmation email to the user
        console.log(`Password reset successful for ${email}`)
        return c.json(
            { message: 'Password reset success', data: {} },
            HttpStatusCodes.OK,
        )
    }
    return c.json(
        { message: 'Error resetting password', data: {} },
        HttpStatusCodes.BAD_REQUEST,
    )
}

export const authV1Routes = createRouter()
    .openapi(loginRoute, loginHandler)
    .openapi(registerRoute, registerHandler)
    .openapi(verifyEmailRoute, verifyEmailHandler)
    .openapi(changePasswordRoute, changePasswordHandler)
    .openapi(forgotPasswordRoute, forgotPasswordHandler)
    .openapi(resetPasswordRoute, resetPasswordHandler)
