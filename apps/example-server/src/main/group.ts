import { zValidator } from '@hono/zod-validator'
import { eq, and, getTableColumns, inArray } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { toInt } from 'radash'
import { db } from '../core/db/db'
import { groupsTable, groupToUsersTable } from '../core/db/schema'
import { zIds } from '../core/models/common.schema'
import { zInsertGroup, zUpdateGroup } from '../core/models/group.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

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
app.get('/:id', jwt({ secret }), async (c) => {
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

// Create a new Group
app.post('/', zValidator('json', zInsertGroup), jwt({ secret }), async (c) => {
    const body = await c.req.valid('json')
    const userId = await c.get('jwtPayload').sub

    // update users to group table as well
    try {
        const result = await db.transaction(async (trx) => {
            // Insert a new group
            const [newGroup] = await trx
                .insert(groupsTable)
                .values(body)
                .returning({
                    id: groupsTable.id,
                })

            // Insert a new entry into group_users
            await trx.insert(groupToUsersTable).values({
                groupId: newGroup.id,
                userId: userId,
                role: 'owner',
            })
        })

        return c.json({ data: result, message: 'Group created' }, 201)
    } catch (error) {
        return c.json({ error: 'Error creating group' }, 500)
    }
})

// Update a Group by ID
app.put('/:id', zValidator('json', zUpdateGroup), async (c) => {
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
})

// Delete a Group by ID
app.delete('/:id', async (c) => {
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

// Delete many Groups
app.delete('/', zValidator('json', zIds), async (c) => {
    const { ids } = await c.req.json()
    const result = await db
        .delete(groupsTable)
        .where(inArray(groupsTable.id, ids))
        .returning()

    return c.json({
        message: 'Groups with given IDs deleted',
        count: result.length,
    })
})

export default app
