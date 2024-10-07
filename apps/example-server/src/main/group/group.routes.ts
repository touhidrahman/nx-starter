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
import { createGroup, deleteGroup, isOwner, updateGroup } from './group.service'
import { findUserByUserIdAndGroupId, userExists } from '../user/user.service'

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
                    eq(permissionsTable.role, payload?.role),
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
    const id = c.req.param('id')
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
    const body = c.req.valid('json')
    const { userId, role, groupId } = await c.get('jwtPayload')
    try {
        // check if group already created where he is a owner
        const hasOwnedGroup = await isOwner(userId, groupId)
        if (hasOwnedGroup) {
            return c.json(
                {
                    message: 'You already have a group owned by you',
                },
                403,
            )
        }

        // Insert a new entry into groups
        const [newGroup] = await createGroup({ ...body, ownerId: userId })

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
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const result = await updateGroup(id, body)

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
        const id = c.req.param('id')
        const result = await deleteGroup(id)

        if (result.length === 0) {
            return c.json({ error: 'Group not found' }, 404)
        }

        return c.json({ data: result, message: 'Group deleted' })
    },
)

app.post(
    '/:id/update-user-role',
    zValidator('json', z.object({ userId: z.string(), role: z.string() })),
    jwt({ secret }),
    isGroupOwner,
    async (c) => {
        const id = c.req.param('id')
        const { userId, role } = c.req.valid('json')

        try {
            const exists = await userExists(userId)
            if (!exists) {
                return c.json({ error: 'User not found' }, 404)
            }
            const user = await findUserByUserIdAndGroupId(userId, id)
            if (user) {
                return c.json({ error: 'User already in group' }, 400)
            }

            return c.json({ data: '', message: 'User added to group' }, 201)
        } catch (error) {
            return c.json({ error: 'Error adding user to group' }, 500)
        }
    },
)

export default app
