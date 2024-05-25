import { randomBytes, randomUUID } from 'node:crypto'
import { access } from 'node:fs'
import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { decode, sign, verify } from 'hono/jwt'
import { logger } from 'hono/logger'
import { db } from '../core/db/db'
import { usersTable } from '../core/db/schema'

const app = new Hono()

app.post('/login', async (c) => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }

    const { email, password } = await c.req.json()

    const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
    if (users.length === 0) {
        c.status(400)
        return c.json({ message: 'Invalid email or password' })
    }

    try {
        const user = users[0]
        if (!(await argon2.verify(user.password, password))) {
            c.status(400)
            return c.json({ message: 'Invalid email or password' })
        }

        const now = dayjs()
        const accessToken = await sign(
            {
                email: user.email,
                role: user.role,
                type: user.type,
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
            .update(usersTable)
            .set({ lastLogin: now.toDate() })
            .where(eq(usersTable.id, user.id))

        return c.json({
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
                user: {
                    ...user,
                    password: undefined,
                    lastLogin: now.toISOString(),
                },
            },
        })
    } catch (error) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
})

app.post('/register', async (c) => {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!refreshTokenSecret) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }

    const {
        email,
        password,
        firstName,
        lastName,
        role = 'client',
        type = 'user',
    } = await c.req.json()
    const hash = await argon2.hash(password)

    try {
        const user = await db
            .insert(usersTable)
            .values({
                email,
                password: hash,
                firstName,
                lastName,
                role,
                type,
            })
            .returning({ id: usersTable.id })

        // send email verification
        const random = randomBytes(64).toString('hex')
        const token = await sign(
            { email, sub: user[0].id, exp: dayjs().add(7, 'day').valueOf() },
            refreshTokenSecret,
        )
        const verificationToken = `${random}&${token}`
        console.log('TCL: | app.post | verificationToken:', verificationToken)

        c.status(201)
        return c.json({ message: 'Account created' })
    } catch (e) {
        c.status(400)
        return c.json({ message: 'Email already exists' })
    }
})

app.post('/verify-email/:token', async (c) => {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!refreshTokenSecret) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
    const { token } = c.req.param()
    const verificationToken = token.split('&')
    const { email, sub, exp } = await verify(
        verificationToken[1],
        refreshTokenSecret,
    )
    if (exp && exp < dayjs().valueOf())
        return c.json({ message: 'Token expired' })
    // update user verified status
    if (!email || !sub) return c.json({ message: 'Invalid token' })

    try {
        await db
            .update(usersTable)
            .set({ verified: true })
            .where(
                and(
                    eq(usersTable.id, Number(sub)),
                    eq(usersTable.email, String(email)),
                ),
            )

        return c.json({ message: 'Email verified' })
    } catch (error) {
        c.status(400)
        return c.json({ message: 'Invalid token' })
    }
})
app.post('/forgot-password', async (c) => {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!refreshTokenSecret) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }

    const { email } = await c.req.json()
    const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
    if (users.length === 0) {
        c.status(400)
        return c.json({ message: 'Invalid email' })
    }

    const user = users[0]
    const token = await sign(
        { email, sub: user.id, exp: dayjs().add(120, 'minute').valueOf() },
        refreshTokenSecret,
    )
    // send email with reset password link
    console.log('TCL: | app.post | token:', token)

    return c.json({ message: 'Reset password link sent' })
})

app.post('/reset-password/:token', async (c) => {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    if (!refreshTokenSecret) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
    const { token } = c.req.param()
    const { email, sub, exp } = await verify(token, refreshTokenSecret)
    if (exp && exp < dayjs().valueOf())
        return c.json({ message: 'Token expired' })
    // update user password
    if (!email || !sub) return c.json({ message: 'Invalid token' })

    const { password } = await c.req.json()
    const hash = await argon2.hash(password)

    try {
        await db
            .update(usersTable)
            .set({ password: hash })
            .where(
                and(
                    eq(usersTable.id, Number(sub)),
                    eq(usersTable.email, String(email)),
                ),
            )

        return c.json({ message: 'Password reset successful' })
    } catch (error) {
        c.status(400)
        return c.json({ message: 'Invalid token' })
    }
})

export default app
