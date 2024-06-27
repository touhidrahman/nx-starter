import { zValidator } from '@hono/zod-validator'
import * as argon2 from 'argon2'
import dayjs from 'dayjs'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { sign, verify } from 'hono/jwt'
import { randomBytes } from 'node:crypto'
import { z } from 'zod'
import { db } from '../core/db/db'
import { checkSecretsMiddleware } from '../core/middlewares/check-secrets.middleware'
import { safeUser } from '../core/utils/user.util'
import { userTypeEnum, usersTable } from '../core/db/schema/user.schema'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    type: z.enum(userTypeEnum.enumValues).optional().default('user'),
})
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? ''
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ?? ''

const app = new Hono()

app.use(checkSecretsMiddleware)

app.post('/login', zValidator('json', loginSchema), async (c) => {
    const { email, password } = c.req.valid('json')

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
                    ...safeUser(user),
                    lastLogin: now.toISOString(),
                },
            },
        })
    } catch (error) {
        throw new HTTPException(500, { message: 'Internal server error' })
    }
})

app.post('/register', zValidator('json', registerSchema), async (c) => {
    const { email, password, firstName, lastName, type } = c.req.valid('json')
    const hash = await argon2.hash(password)

    try {
        const user = await db
            .insert(usersTable)
            .values({
                email,
                password: hash,
                firstName,
                lastName,
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
    },
)

export default app
