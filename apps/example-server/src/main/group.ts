import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { toInt } from 'radash'
import { db } from '../core/db/db'
import { groupToUsersTable, groupsTable, usersTable } from '../core/db/schema'
import { zInsertGroup, zUpdateGroup } from '../core/models/group.schema'
import { z } from 'zod'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

// Groups cannot be modified other than owner
const hasAccessToGroup = async (ctx: Context, next: Next) => {
    const { sub: userId, role } = ctx.get('jwtPayload')
    if (role === 'admin') {
        return next()
    }

    if (role !== 'owner') {
        return ctx.json({ error: 'Unauthorized' }, 403)
    }

    const id = toInt(ctx.req.param('id'))

    const record = await db
        .select({ role: groupToUsersTable.role })
        .from(groupToUsersTable)
        .where(
            and(
                eq(groupToUsersTable.groupId, id),
                eq(groupToUsersTable.userId, userId),
            ),
        )
        .limit(1)
    if (record.length === 0) {
        return ctx.json({ error: 'Unauthorized' }, 403)
    }

    return next()
}

// Get my Groups
app.get('/', jwt({ secret }), async (c) => {
    const user = c.get('jwtPayload')
    const result = await db
        .select({ ...getTableColumns(groupsTable) })
        .from(groupsTable)
        .innerJoin(
            groupToUsersTable,
            eq(groupsTable.id, groupToUsersTable.groupId),
        )
        .where(eq(groupToUsersTable.userId, user.sub))
        .limit(10)
        .offset(0)

    return c.json({ data: result, message: 'My Groups' })
})

// Get a Group by ID
app.get('/:id', jwt({ secret }), hasAccessToGroup, async (c) => {
    const id = toInt(c.req.param('id'))
    const user = c.get('jwtPayload')

    const result = await db
        .select({ ...getTableColumns(groupsTable) })
        .from(groupsTable)
        .innerJoin(
            groupToUsersTable,
            eq(groupsTable.id, groupToUsersTable.groupId),
        )
        .where(
            and(eq(groupToUsersTable.userId, user.sub), eq(groupsTable.id, id)),
        )
        .limit(1)

    if (result.length === 0) {
        return c.json({ error: 'Group not found' }, 404)
    }

    return c.json({ data: result[0], message: 'Group details' })
})

// Create a new Group. Can create only one group
app.post('/', zValidator('json', zInsertGroup), jwt({ secret }), async (c) => {
    const body = await c.req.valid('json')
    const userId = await c.get('jwtPayload').sub

    try {
        // check if group already created where he is a owner
        const group = await db
            .select()
            .from(groupToUsersTable)
            .where(
                and(
                    eq(groupToUsersTable.userId, userId),
                    eq(groupToUsersTable.role, 'owner'),
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
        await db.insert(groupToUsersTable).values({
            groupId: newGroup.id,
            userId: userId,
            role: 'owner',
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
    hasAccessToGroup,
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
app.delete('/:id', jwt({ secret }), hasAccessToGroup, async (c) => {
    const id = toInt(c.req.param('id'))
    const result = await db
        .delete(groupsTable)
        .where(eq(groupsTable.id, id))
        .returning()

    if (result.length === 0) {
        return c.json({ error: 'Group not found' }, 404)
    }

    return c.json({ data: result, message: 'Group deleted' })
})

// add user to a group
app.post(
    '/:id/add-user',
    zValidator('json', z.object({ userId: z.string(), role: z.string() })),
    jwt({ secret }),
    hasAccessToGroup,
    async (c) => {
        const id = toInt(c.req.param('id'))
        const body = await c.req.json()
        const userId = body.userId
        const role = body.role

        try {
            const result = await db.transaction(async (trx) => {
                const [group] = await trx
                    .select()
                    .from(groupsTable)
                    .where(eq(groupsTable.id, id))
                    .limit(1)

                if (!group) {
                    return c.json({ error: 'Group not found' }, 404)
                }

                const [user] = await trx
                    .select()
                    .from(usersTable)
                    .where(eq(usersTable.id, userId))
                    .limit(1)

                if (!user) {
                    return c.json({ error: 'User not found' }, 404)
                }

                const [groupUser] = await trx
                    .select()
                    .from(groupToUsersTable)
                    .where(
                        and(
                            eq(groupToUsersTable.groupId, id),
                            eq(groupToUsersTable.userId, userId),
                        ),
                    )
                    .limit(1)

                if (groupUser) {
                    return c.json({ error: 'User already in group' }, 400)
                }

                await trx.insert(groupToUsersTable).values({
                    groupId: id,
                    userId,
                    role,
                })
            })

            return c.json({ data: result, message: 'User added to group' }, 201)
        } catch (error) {
            return c.json({ error: 'Error adding user to group' }, 500)
        }
    },
)

export default app
