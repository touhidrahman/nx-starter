import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../core/db/db'
import { usersTable } from '../core/db/schema'
import { safeUser } from '../core/utils/user.util'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

app.get('/me', jwt({ secret }), async (c) => {
    const payload = c.get('jwtPayload')
    const users = await db
        .select({ ...getTableColumns(usersTable) })
        .from(usersTable)
        .where(eq(usersTable.id, payload.sub))
        .limit(1)

    return c.json({ data: safeUser(users[0]), message: 'Logged in user' })
})

export default app
