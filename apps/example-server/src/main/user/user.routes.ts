import { zValidator } from '@hono/zod-validator'
import { SQL, eq, getTableColumns, like, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { checkToken } from '../auth/auth.middleware'
import { zInsertInvite } from '../invite/invite.schema'
import { createInvite } from '../invite/invite.service'
import {
    deleteUser,
    findUserByAuthUserIdAndGroupId,
    findUserById,
    findUsersByAuthUserId,
    updateUser,
} from './user.service'
import { safeUser } from './user.util'
import { zInsertUser, zSearchUser, zUpdateUser } from './user.schema'
import { toInt } from 'radash'
import { usersTable } from '../../core/db/schema'

const app = new Hono()

app.get('/me', checkToken, async (c) => {
    const payload = c.get('jwtPayload')
    const user = await findUserByAuthUserIdAndGroupId(
        payload.sub,
        payload.groupId,
    )

    return c.json({ data: user, message: 'Logged in user' })
})

app.get('/my-profiles', checkToken, async (c) => {
    const payload = c.get('jwtPayload')
    const users = await findUsersByAuthUserId(payload.sub)

    return c.json({ data: users, message: 'User profiles' })
})

// Invite user
app.post(
    '/invite',
    checkToken,
    zValidator('json', zInsertInvite),
    async (c) => {
        const body = c.req.valid('json')
        const payload = c.get('jwtPayload')

        const newUser = await createInvite(body, payload.userId)

        return c.json({ data: newUser, message: 'User invited' })
    },
)

// Update user
app.put(
    '/update/:id',
    checkToken,
    zValidator('json', zUpdateUser),
    async (c) => {
        const body = c.req.valid('json')
        const userId = toInt(c.req.param('id'))
        const updatedUser = await updateUser(userId, body)

        return c.json({ data: updatedUser, message: 'User updated' })
    },
)

// Delete user
app.delete('/delete/:id', checkToken, async (c) => {
    const userId = toInt(c.req.param('id'))
    await deleteUser(userId)

    return c.json({ message: 'User deleted' })
})

// Search single user by ID
app.get('/user/:id', checkToken, async (c) => {
    const userId = toInt(c.req.param('id'))
    const user = await findUserById(userId)

    if (!user) {
        return c.json({ message: 'User not found' }, 404)
    }

    return c.json({ data: user, message: 'User found' })
})

// Search users by various criteria
app.get('/search', checkToken, zValidator('query', zSearchUser), async (c) => {
    const query = c.req.valid('query')
    const conditions: SQL[] = []

    query?.id && conditions.push(eq(usersTable.id, query?.id))
    query?.email && conditions.push(eq(usersTable.email, query?.email))
    query?.firstName &&
        conditions.push(eq(usersTable.firstName, query?.firstName))
    query?.lastName && conditions.push(eq(usersTable.lastName, query?.lastName))
    query?.groupId && conditions.push(eq(usersTable.groupId, query?.groupId))
    query?.authUserId &&
        conditions.push(eq(usersTable.authUserId, query?.authUserId))
    query?.city && conditions.push(eq(usersTable.city, query?.city))
    query?.country && conditions.push(eq(usersTable.country, query?.country))
    query?.postCode && conditions.push(eq(usersTable.postCode, query?.postCode))
    query?.role && conditions.push(eq(usersTable.role, query?.role))

    const limit = query?.size ? toInt(query?.size) : 10
    const offset = (query?.page ? toInt(query?.page) : 0) * limit

    const users = await db
        .select({ ...getTableColumns(usersTable) })
        .from(usersTable)
        .where(
            // TODO verify if this is correct
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
        .limit(limit)
        .offset(offset)

    return c.json({ data: users, message: 'Search results' })
})

export default app
