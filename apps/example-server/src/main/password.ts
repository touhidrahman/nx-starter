import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { sign, verify } from 'hono/jwt'
import { db } from '../core/db/db'
import { checkSecretsMiddleware } from '../core/middlewares/check-secrets.middleware'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { usersTable } from '../core/db/schema/auth.schema'

const app = new Hono()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ''
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? ''
const emailSchema = z.object({
    email: z.string().email(),
})
const changePasswordSchema = z.object({
    email: z.string().email(),
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
})

app.use(checkSecretsMiddleware)

app.post('/forgot', zValidator('json', emailSchema), async (c) => {
    const { email } = await c.req.valid('json')
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

app.post('/reset/:token', async (c) => {
    const { token } = c.req.param()
    const { email, sub, exp } = await verify(token, refreshTokenSecret)
    if (exp && exp < dayjs().valueOf())
        return c.json({ message: 'Token expired' })
    // update user password
    if (!email || !sub) return c.json({ message: 'Invalid token' })

    const { password, confirmPassword } = await c.req.json()
    if (password !== confirmPassword) {
        c.status(400)
        return c.json({ message: 'Passwords do not match' })
    }
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
        throw new HTTPException(500, { message: 'Internal server error' })
    }
})

app.post('/change', zValidator('json', changePasswordSchema), async (c) => {
    const { email, currentPassword, newPassword, confirmNewPassword } =
        c.req.valid('json')
    if (confirmNewPassword !== newPassword) {
        c.status(400)
        return c.json({ message: 'Passwords do not match' })
    }
    const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
    if (users.length === 0) {
        c.status(400)
        return c.json({ message: 'Invalid email' })
    }

    const user = users[0]
    if (!(await argon2.verify(user.password, currentPassword))) {
        c.status(400)
        return c.json({ message: 'Invalid password' })
    }

    const hash = await argon2.hash(newPassword)

    try {
        await db
            .update(usersTable)
            .set({ password: hash })
            .where(eq(usersTable.id, user.id))

        return c.json({ message: 'Password changed' })
    } catch (error) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
})

export default app
