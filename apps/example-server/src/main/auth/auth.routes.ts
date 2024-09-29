import { zValidator } from '@hono/zod-validator'
import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { sign, verify } from 'hono/jwt'
import { randomBytes } from 'node:crypto'
import { toInt } from 'radash'
import { z } from 'zod'
import { db } from '../../core/db/db'
import {
    groupsTable,
    groupsToUsersTable,
    authUsersTable,
} from '../../core/db/schema'
import { checkSecretsMiddleware } from '../../core/middlewares/check-secrets.middleware'
import { getDefaultGroup, getGroup } from '../group/group.service'
import { safeUser } from '../user/user.util'
import {
    zChangePassword,
    zForgotPassword,
    zLogin,
    zRegister,
    zResetPassword,
} from './auth.schema'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ''
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? ''

const app = new Hono()

app.use(checkSecretsMiddleware)

app.post('/login', zValidator('json', zLogin), async (c) => {
    const { email, password } = c.req.valid('json')
    const groupId = c.req.query('groupId')

    const users = await db
        .select()
        .from(authUsersTable)
        .where(eq(authUsersTable.email, email))

    if (users.length === 0) {
        return c.json({ message: 'Invalid email or password' }, 400)
    }

    try {
        const user = users[0]
        if (!(await argon2.verify(user.password, password))) {
            return c.json({ message: 'Invalid email or password' }, 400)
        }

        const group = groupId
            ? await getGroup(toInt(groupId))
            : await getDefaultGroup(user.id)
        const now = dayjs()
        const accessToken = await sign(
            {
                email: user.email,
                type: user.type,
                roleId: group?.roleId ?? '',
                groupId: group?.id ?? '',
                groupType: group?.type ?? '',
                sub: user.id,
                exp: now.add(15, 'minute').valueOf(),
            },
            accessTokenSecret,
        )
        const refreshToken = await sign(
            {
                email: user.email,
                sub: user.id,
                exp: now.add(7, 'day').valueOf(),
            },
            refreshTokenSecret,
        )

        await db
            .update(authUsersTable)
            .set({ lastLogin: now.toDate() })
            .where(eq(authUsersTable.id, user.id))

        return c.json({
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
                user: {
                    ...safeUser(user),
                    lastLogin: now.toISOString(),
                },
            },
        })
    } catch (error) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
})

app.post('/register', zValidator('json', zRegister), async (c) => {
    const { email, password, firstName, lastName, type } = c.req.valid('json')
    const hash = await argon2.hash(password)

    try {
        // Insert new user
        const user = await db
            .insert(authUsersTable)
            .values({
                email,
                password: hash,
                firstName,
                lastName,
                type,
            })
            .returning({ id: authUsersTable.id })

        const userId = user[0].id

        // Create a new client group for the user
        const group = await db
            .insert(groupsTable)
            .values({
                type: 'client',
                name: `${firstName} ${lastName}'s Group`,
                verified: false,
            })
            .returning({ id: groupsTable.id })

        const groupId = group[0].id

        // Link the user to the new group
        await db.insert(groupsToUsersTable).values({
            userId,
            groupId,
            isDefault: false,
            isOwner: false,
        })

        // Generate verification token
        const random = randomBytes(64).toString('hex')
        const token = await sign(
            { email, sub: userId, exp: dayjs().add(7, 'day').valueOf() },
            refreshTokenSecret,
        )
        const verificationToken = `${random}&${token}`
        console.log('TCL: | verificationToken:', verificationToken)

        return c.json({ message: 'Account created' }, 201)
    } catch (e) {
        console.error('Error creating account:', e)
        return c.json({ message: 'Email already exists' }, 400)
    }
})

app.post('/admin/register', zValidator('json', zRegister), async (c) => {
    const { email, password, firstName, lastName } = c.req.valid('json')
    const hash = await argon2.hash(password)

    try {
        await db
            .insert(authUsersTable)
            .values({
                email,
                password: hash,
                firstName,
                lastName,
                type: 'admin',
                verified: false, // Not verified yet, requires admin approval
            })
            .returning({ id: authUsersTable.id })

        return c.json(
            { message: 'Admin account created, pending approval' },
            201,
        )
    } catch (e) {
        return c.json({ message: 'Email already exists' }, 400)
    }
})

app.post(
    '/admin/approve',
    zValidator(
        'json',
        z.object({
            userId: z.number(),
        }),
    ),
    async (c) => {
        const { userId } = c.req.valid('json')

        try {
            const result = await db
                .update(authUsersTable)
                .set({ verified: true })
                .where(
                    and(
                        eq(authUsersTable.id, userId),
                        eq(authUsersTable.level, 'admin'),
                    ),
                )

            if (result.rowCount === 0) {
                return c.json(
                    { message: 'User not found or already approved' },
                    404,
                )
            }

            return c.json({ message: 'Admin account approved' })
        } catch (e) {
            return c.json({ message: 'Approval failed' }, 500)
        }
    },
)

app.post(
    '/verify-email/:token',
    zValidator('param', z.object({ token: z.string() })),
    async (c) => {
        const { token } = c.req.valid('param')
        const verificationToken = token.split('&')
        const { email, sub, exp } = await verify(
            verificationToken[1],
            process.env.REFRESH_TOKEN_SECRET ?? '',
        )
        if (exp && exp < dayjs().valueOf())
            return c.json({ message: 'Token expired' }, 400)
        // update user verified status
        if (!email || !sub) return c.json({ message: 'Invalid token' }, 400)

        try {
            await db
                .update(authUsersTable)
                .set({ verified: true })
                .where(
                    and(
                        eq(authUsersTable.id, Number(sub)),
                        eq(authUsersTable.email, String(email)),
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

    // Fetch the user from the database using the userId
    const users = await db
        .select()
        .from(authUsersTable)
        .where(eq(authUsersTable.id, userId))
    if (users.length === 0) {
        return c.json({ message: 'User not found' }, 404)
    }

    const user = users[0]

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

    return c.json({ message: 'Password change success', data: true })
})

// Forgot Password
app.post('/forgot-password', zValidator('json', zForgotPassword), async (c) => {
    const { email } = c.req.valid('json')
    const users = await db
        .select()
        .from(authUsersTable)
        .where(eq(authUsersTable.email, email))
    const user = users[0]

    if (!user) {
        return c.json({ code: 404, message: 'User not found' })
    }

    const token = sign(
        { email, sub: user.id, exp: dayjs().add(1, 'hour').valueOf() },
        refreshTokenSecret,
    )
    // Here you should send the token to the user via email
    console.log(`Password reset token for ${email}: ${token}`)

    return c.json({ message: 'Password reset email sent', data: true })
})

// Reset Password
app.post('/reset-password', zValidator('json', zResetPassword), async (c) => {
    const { email, password } = c.req.valid('json')
    const hashedPassword = await argon2.hash(password)

    const user = await db
        .update(authUsersTable)
        .set({ password: hashedPassword })
        .where(and(eq(authUsersTable.email, email)))

    if (user) {
        // Here you should send a confirmation email to the user
        console.log(`Password reset successful for ${email}`)
        return c.json({ message: 'Password reset success', data: true })
    } else {
        return c.json({ error: 'Error resetting password' })
    }
})

export default app
