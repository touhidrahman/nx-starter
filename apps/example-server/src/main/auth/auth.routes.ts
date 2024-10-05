import { zValidator } from '@hono/zod-validator'
import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { and, count, eq, or } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { sign } from 'hono/jwt'
import { toInt } from 'radash'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { authUsersTable, groupsTable, usersTable } from '../../core/db/schema'
import { checkSecretsMiddleware } from '../../core/middlewares/check-secrets.middleware'
import { safeUser } from '../user/user.util'
import {
    zChangePassword,
    zForgotPassword,
    zLogin,
    zRegister,
    zResetPassword,
} from './auth.schema'
import {
    createAccessToken,
    createForgotPasswordToken,
    createRefreshToken,
    createVerficationToken,
    decodeVerificationToken,
} from './token.util'
import {
    countAuthUserByEmail,
    countUsersByAuthUserId,
    findAuthUserByEmail,
    findAuthUserById,
    findFirstUserByAuthUserId,
    findUserByAuthUserIdAndGroupId,
    isFirstAuthUser,
    updateLastLogin,
} from './auth.service'

const app = new Hono()

app.use(checkSecretsMiddleware)

app.post('/login', zValidator('json', zLogin), async (c) => {
    const { email, password } = c.req.valid('json')
    let groupId = c.req.query('groupId')

    const authUser = await findAuthUserByEmail(email)

    if (!authUser) {
        return c.json({ message: 'Invalid email or password' }, 400)
    }

    const now = dayjs()
    try {
        if (!(await argon2.verify(authUser.password, password))) {
            return c.json({ message: 'Invalid email or password' }, 400)
        }

        await updateLastLogin(authUser.id)
        let accessToken = await createAccessToken(authUser)
        let refreshToken = await createRefreshToken(authUser)

        // if previledged user, return access token
        if (['admin', 'moderator'].includes(authUser.level)) {
            return c.json({
                message: 'Priviledged user login successful',
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        ...safeUser(authUser),
                        lastLogin: now.toISOString(),
                    },
                },
            })
        }

        // if query param has group id, get the user profile belonging to that group
        const groupIdInt = groupId ? toInt(groupId) : null
        let group = undefined
        let user = undefined
        if (groupIdInt) {
            user = await findUserByAuthUserIdAndGroupId(authUser.id, groupIdInt)
            group = user?.group
        } else {
            // if user has only one profile, consider it the default
            const userCount = await countUsersByAuthUserId(authUser.id)

            if (userCount === 1) {
                user = await findFirstUserByAuthUserId(authUser.id)
                group = user?.group
            }
        }

        if (user) {
            accessToken = await createAccessToken(authUser, user, group)
            refreshToken = await createRefreshToken(authUser)
            return c.json({
                message: 'User login successful',
                data: {
                    accessToken,
                    refreshToken,
                    user: {
                        ...user,
                        lastLogin: now.toISOString(),
                    },
                },
            })
        }

        // get all profiles of the user
        const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.authUserId, authUser.id))

        const groups = await db.query.groupsTable.findMany({
            where: or(...users.map((user) => eq(groupsTable.id, user.groupId))),
            columns: {
                id: true,
                name: true,
                type: true,
            },
        })
        return c.json({
            message:
                'Login successful but no group selected. Please select a group to continue',
            data: {
                accessToken,
                refreshToken,
                user: {
                    ...safeUser(authUser),
                    lastLogin: now.toISOString(),
                },
                availableGroups: groups,
            },
        })
    } catch (error) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
})

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
            .returning({ id: authUsersTable.id })

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
