import { zValidator } from '@hono/zod-validator'
import * as argon2 from 'argon2'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { authUsersTable } from '../../core/db/schema'
import { checkSecretsMiddleware } from '../../core/middlewares/check-secrets.middleware'
import {
    zChangePassword,
    zForgotPassword,
    zRegister,
    zResetPassword,
} from './auth.schema'
import {
    countAuthUserByEmail,
    findAuthUserByEmail,
    findAuthUserById,
    isFirstAuthUser,
} from './auth.service'
import {
    createForgotPasswordToken,
    createVerficationToken,
    decodeVerificationToken,
} from './token.util'

const app = new Hono()

app.use(checkSecretsMiddleware)

app.post('/register', zValidator('json', zRegister), async (c) => {
    const { email, password, firstName, lastName, level } = c.req.valid('json')
    const hash = await argon2.hash(password)

    // some checks
    const exists = await countAuthUserByEmail(email)

    if (exists > 0) {
        return c.json({ message: 'Email already exists' }, 400)
    }

    // is auth table empty?
    const isFirstUser = await isFirstAuthUser()

    try {
        // Insert new user
        const createdAuthUser = await db
            .insert(authUsersTable)
            .values({
                email,
                password: hash,
                firstName,
                lastName,
                level: isFirstUser ? 'admin' : level,
                verified: isFirstUser, // First user is auto-verified
            })
            .returning()

        const userId = createdAuthUser[0].id

        // Generate verification token
        if (!isFirstUser) {
            const verificationToken = await createVerficationToken(
                email,
                userId.toString(),
            )
            console.log('TCL: | verificationToken:', verificationToken)

            // TODO: send verification email
        }

        return c.json({ message: 'Account created' }, 201)
    } catch (e) {
        console.error('Error creating account:', e)
        return c.json({ message: 'Internal Server Error' }, 500)
    }
})

app.post(
    '/verify-email/:token',
    zValidator('param', z.object({ token: z.string() })),
    async (c) => {
        const { token } = c.req.valid('param')
        const decoded = await decodeVerificationToken(token)
        if (!decoded) {
            return c.json({ message: 'Invalid or expired token' }, 400)
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

            return c.json({ message: 'Email verified' }, 200)
        } catch (error) {
            return c.json({ message: 'Invalid token' }, 400)
        }
    },
)

// Change Password
app.post('/change-password', zValidator('json', zChangePassword), async (c) => {
    const { userId } = c.req.valid('json')
    if (!userId) {
        return c.json({ message: 'Unauthorized' }, 401)
    }

    const { currentPassword, password } = c.req.valid('json')

    const user = await findAuthUserById(userId)

    if (!user) {
        return c.json({ message: 'User not found' }, 404)
    }

    // Verify the current password
    const currentPasswordMatches = await argon2.verify(
        user.password,
        currentPassword,
    )
    if (!currentPasswordMatches) {
        return c.json({
            code: 400,
            message: 'Current password does not match',
            data: false,
        })
    }

    // Hash the new password and update the database
    const hashedPassword = await argon2.hash(password)
    await db
        .update(authUsersTable)
        .set({ password: hashedPassword })
        .where(eq(authUsersTable.id, userId))

    return c.json({ message: 'Password changed successfully', data: true })
})

// Forgot Password
app.post('/forgot-password', zValidator('json', zForgotPassword), async (c) => {
    const { email } = c.req.valid('json')
    const user = await findAuthUserByEmail(email)

    if (!user) {
        return c.json({ code: 404, message: 'User not found' })
    }

    const token = await createForgotPasswordToken(email, user.id.toString())
    // TODO send the token to the user via email
    console.log(`Password reset token for ${email}: ${token}`)

    return c.json({ message: 'Password reset email sent', data: true })
})

// Reset Password
app.post(
    '/reset-password/:token',
    zValidator('json', zResetPassword),
    async (c) => {
        const { email, password } = c.req.valid('json')
        const token = c.req.query('token') ?? ''
        const user = await findAuthUserByEmail(email)

        if (user) {
            const hashedPassword = await argon2.hash(password)
            await db
                .update(authUsersTable)
                .set({ password: hashedPassword })
                .where(eq(authUsersTable.id, user.id))
            // TODO send a confirmation email to the user
            console.log(`Password reset successful for ${email}`)
            return c.json({ message: 'Password reset success', data: true })
        } else {
            return c.json({ error: 'Error resetting password' })
        }
    },
)

export default app
