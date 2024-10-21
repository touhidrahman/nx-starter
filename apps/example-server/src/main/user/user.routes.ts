import { zValidator } from '@hono/zod-validator'
import { SQL, eq, getTableColumns, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { toInt } from 'radash'
import { createRouter } from '../../core/create-app'
import { db } from '../../core/db/db'
import { usersTable } from '../../core/db/schema'
import { checkToken } from '../auth/auth.middleware'
import { zInsertInvite } from '../invite/invite.schema'
import { createInvite } from '../invite/invite.service'
import { getMeHandler, getMeRoute } from './routes/get-me'
import { zSearchUser, zUpdateUser } from './user.schema'
import {
    deleteUser,
    findUserByAuthUserIdAndGroupId,
    findUserById,
    findUsersByAuthUserId,
    updateUser,
} from './user.service'
import {
    getMyProfilesHandler,
    getMyProfilesRoute,
} from './routes/get-my-profiles'

export const userV1Routes = createRouter()
    .openapi(getMeRoute, getMeHandler)
    .openapi(getMyProfilesRoute, getMyProfilesHandler)

const app = new Hono()

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
        const userId = c.req.param('id')
        const updatedUser = await updateUser(userId, body)

        return c.json({ data: updatedUser, message: 'User updated' })
    },
)

// Delete user
app.delete('/delete/:id', checkToken, async (c) => {
    const userId = c.req.param('id')
    await deleteUser(userId)

    return c.json({ message: 'User deleted' })
})

// Search single user by ID
app.get('/user/:id', checkToken, async (c) => {
    const userId = c.req.param('id')
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
