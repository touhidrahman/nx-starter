import { SQL, eq, getTableColumns, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { safeUser } from './user.util'
import { z } from 'zod'
import { authUsersTable } from '../../core/db/schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

app.get('/me', authMiddleware, async (c) => {
    const payload = c.get('jwtPayload')
    const users = await db
        .select({ ...getTableColumns(authUsersTable) })
        .from(authUsersTable)
        .where(eq(authUsersTable.id, payload.sub))
        .limit(1)

    return c.json({ data: safeUser(users[0]), message: 'Logged in user' })
})

// Invite user
app.post('/invite', authMiddleware, async (c) => {
    const inviteSchema = z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        type: z.enum(['admin', 'moderator', 'user']),
    })

    const body = await c.req.json()
    const parsedBody = inviteSchema.parse(body)

    const newUser = await db
        .insert(authUsersTable)
        .values({
            firstName: parsedBody.firstName,
            lastName: parsedBody.lastName,
            email: parsedBody.email,
            password: 'temporarypassword',
            type: parsedBody.type,
        })
        .returning()

    return c.json({ data: newUser, message: 'User invited' })
})

// Update user
app.put('/update/:id', authMiddleware, async (c) => {
    const updateSchema = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        type: z.enum(['admin', 'moderator', 'user']).optional(),
        verified: z.boolean().optional(),
    })

    const body = await c.req.json()
    const parsedBody = updateSchema.parse(body)
    const userId = parseInt(c.req.param('id'), 10)

    const updatedUser = await db
        .update(authUsersTable)
        .set(parsedBody)
        .where(eq(authUsersTable.id, userId))
        .returning()

    return c.json({ data: updatedUser, message: 'User updated' })
})

// Delete user
app.delete('/delete/:id', authMiddleware, async (c) => {
    const userId = parseInt(c.req.param('id'), 10)

    await db.delete(authUsersTable).where(eq(authUsersTable.id, userId))

    return c.json({ message: 'User deleted' })
})

// Search single user by ID
app.get('/user/:id', authMiddleware, async (c) => {
    const userId = parseInt(c.req.param('id'), 10)

    const users = await db
        .select({ ...getTableColumns(authUsersTable) })
        .from(authUsersTable)
        .where(eq(authUsersTable.id, userId))
        .limit(1)

    if (users.length === 0) {
        return c.json({ message: 'User not found' }, 404)
    }

    return c.json({ data: safeUser(users[0]), message: 'User found' })
})

// Search users by various criteria
app.get('/search', authMiddleware, async (c) => {
    const searchSchema = z.object({
        email: z.string().email().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        type: z.enum(['admin', 'moderator', 'user']).optional(),
    })

    const query = c.req.query()
    const parsedQuery = searchSchema.parse(query)

    const conditions: SQL[] = []

    if (parsedQuery.email) {
        conditions.push(eq(authUsersTable.email, parsedQuery.email))
    }
    if (parsedQuery.firstName) {
        conditions.push(eq(authUsersTable.firstName, parsedQuery.firstName))
    }
    if (parsedQuery.lastName) {
        conditions.push(eq(authUsersTable.lastName, parsedQuery.lastName))
    }
    if (parsedQuery.type) {
        conditions.push(eq(authUsersTable.level, parsedQuery.type))
    }

    const users = await db
        .select({ ...getTableColumns(authUsersTable) })
        .from(authUsersTable)
        .where(
            conditions.length
                ? sql`${conditions.reduce(
                      (acc, condition, index) =>
                          index === 0
                              ? condition
                              : sql`${acc} AND ${condition}`,
                      sql``,
                  )}`
                : undefined,
        )
        .limit(10)

    return c.json({ data: users.map(safeUser), message: 'Search results' })
})

export default app
