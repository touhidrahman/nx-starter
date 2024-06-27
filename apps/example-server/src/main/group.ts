import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns, inArray } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { toInt } from 'radash'
import { db } from '../core/db/db'
import { zIds } from '../core/db/schema/common.schema'
import {
    groupsTable,
    zInsertGroup,
    zUpdateGroup,
} from '../core/db/schema/group.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// Get all Groups
// TODO: implement pagination
app.get('/', async (c) => {
    const result = await db
        .select({ ...getTableColumns(groupsTable) })
        .from(groupsTable)
        .limit(10)
        .offset(0)

    return c.json({ data: result, message: 'Group list' })
})

// Get a Group by ID
app.get('/:id', async (c) => {
    const id = toInt(c.req.param('id'))
    const result = await db
        .select({ ...getTableColumns(groupsTable) })
        .from(groupsTable)
        .where(eq(groupsTable.id, id))
        .limit(1)

    if (result.length === 0) {
        return c.json({ error: 'Group not found' }, 404)
    }

    return c.json({ data: result[0], message: 'Group details' })
})

// Create a new Group
app.post('/', zValidator('json', zInsertGroup), async (c) => {
    const body = await c.req.valid('json')
    const result = await db.insert(groupsTable).values(body).returning()

    return c.json({ data: result, message: 'Group created' }, 201)
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
