import { zValidator } from '@hono/zod-validator'
import { and, count, eq, getTableColumns } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { toInt } from 'radash'
import { db } from '../../core/db/db'
import {
    groupsTable,
    permissionsTable,
    authUsersTable,
    usersTable,
} from '../../core/db/schema'
import { zInsertGroup, zUpdateGroup } from './group.schema'
import { z } from 'zod'
import { isGroupOwner } from '../../core/middlewares/is-group-owner.middleware'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

function hasPermission(area: string, requiredLevel: 1 | 2 | 3 | 4) {
    return async (ctx: Context, next: Next) => {
        const payload = await ctx.get('jwtPayload')
        if (!payload) return ctx.json({ error: 'Unauthorized' }, 403)

        // check in permissions table
        const record = await db
            .select()
            .from(permissionsTable)
            .where(
                and(
                    eq(permissionsTable.roleId, payload?.roleId),
                    eq(permissionsTable.area, area),
                ),
            )
            .limit(1)

        if (record.length === 0) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        if (record[0].access < requiredLevel) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        return next()
    }
}

// Get my Groups
app.get('/', jwt({ secret }), async (c) => {
    const user = c.get('jwtPayload')
    const result = await db.query.usersTable.findMany({
        where: eq(usersTable.authUserId, user.sub),
        with: { group: true },
    })

    return c.json({ data: result.map((u) => u.group), message: 'My Groups' })
})

// Get a Group by ID
app.get('/:id', jwt({ secret }), isGroupOwner, async (c) => {
    const id = toInt(c.req.param('id'))
    const user = c.get('jwtPayload')

    const result = await db
        .select()
        .from(groupsTable)
        .where(and(eq(groupsTable.id, id)))
        .limit(1)

    if (result.length === 0) {
        return c.json({ error: 'Group not found' }, 404)
    }

    return c.json({ data: result[0], message: 'Group details' })
})

// Create a new Group. Can create only one group
app.post('/', zValidator('json', zInsertGroup), jwt({ secret }), async (c) => {
    const body = await c.req.valid('json')
    const { userId, roleId } = await c.get('jwtPayload')
    try {
        // check if group already created where he is a owner
        const group = await db
            .select()
            .from(groupsToUsersTable)
            .where(
                and(
                    eq(groupsToUsersTable.userId, userId),
                    eq(groupsToUsersTable.roleId, 4),
                    eq(groupsToUsersTable.isOwner, true),
                ),
            )
            .limit(1)
        if (group.length > 0) {
            return c.json(
                { error: 'A Group with ownership already exists' },
                400,
            )
        }

        const [newGroup] = await db.insert(groupsTable).values(body).returning()
        // Insert a new entry into group_users
        await db.insert(groupsToUsersTable).values({
            groupId: newGroup.id,
            userId: userId,
            isOwner: true,
            isDefault: true,
        })

        return c.json({ data: newGroup, message: 'Group created' }, 201)
    } catch (error) {
        return c.json({ error, message: 'Error creating group' }, 500)
    }
})

// Update a Group by ID
app.put(
    '/:id',
    zValidator('json', zUpdateGroup),
    jwt({ secret }),
    isGroupOwner,
    hasPermission('Group', 1),
    async (c) => {
        const id = toInt(c.req.param('id'))
        const body = await c.req.valid('json')
        const result = await db
            .update(groupsTable)
            .set(body)
            .where(eq(groupsTable.id, id))
            .returning()

        if (result.length === 0) {
            return c.json({ error: 'Group not found' }, 404)
        }

        return c.json({ data: result[0], message: 'Group updated' })
    },
)

// Delete a Group by ID
app.delete(
    '/:id',
    jwt({ secret }),
    isGroupOwner,
    hasPermission('Group', 1),
    async (c) => {
        const id = toInt(c.req.param('id'))
        const result = await db
            .delete(groupsTable)
            .where(eq(groupsTable.id, id))
            .returning()

        if (result.length === 0) {
            return c.json({ error: 'Group not found' }, 404)
        }

        return c.json({ data: result, message: 'Group deleted' })
    },
)

// add user to a group
app.post(
    '/:id/add-user',
    zValidator('json', z.object({ userId: z.number(), roleId: z.number() })),
    jwt({ secret }),
    isGroupOwner,
    async (c) => {
        const id = toInt(c.req.param('id'))
        const { userId, roleId } = await c.req.valid('json')

        try {
            const [user] = await db
                .select()
                .from(authUsersTable)
                .where(eq(authUsersTable.id, userId))
                .limit(1)

            if (!user) {
                return c.json({ error: 'User not found' }, 404)
            }

            const [groupUser] = await db
                .select()
                .from(groupsToUsersTable)
                .where(
                    and(
                        eq(groupsToUsersTable.groupId, id),
                        eq(groupsToUsersTable.userId, userId),
                    ),
                )
                .limit(1)

            if (groupUser) {
                return c.json({ error: 'User already in group' }, 400)
            }

            await db.insert(groupsToUsersTable).values({
                groupId: id,
                userId,
                roleId,
            })

            const userGroups = await db
                .select({ count: count() })
                .from(groupsToUsersTable)
                .where(eq(groupsToUsersTable.userId, userId))

            // make the group default for the inserted user
            if (userGroups[0].count === 1) {
                await db
                    .update(groupsToUsersTable)
                    .set({ isDefault: true })
                    .where(
                        and(
                            eq(groupsToUsersTable.userId, userId),
                            eq(groupsToUsersTable.groupId, id),
                        ),
                    )
            }

            return c.json({ data: '', message: 'User added to group' }, 201)
        } catch (error) {
            return c.json({ error: 'Error adding user to group' }, 500)
        }
    },
)

export default app
