import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns, inArray } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { toInt } from 'radash'
import { db } from '../../core/db/db'
import { groupsTable } from '../../core/db/schema'
import { isAdmin } from '../../core/middlewares/is-admin.middleware'
import { zIds } from '../../core/models/common.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

app.get('/', jwt({ secret }), isAdmin, async (c) => {
    const user = c.get('jwtPayload')
    const result = await db.select().from(groupsTable).limit(10).offset(0)

    return c.json({ data: result, message: 'Groups list' })
})

// Get a Group by ID
app.get('/:id', jwt({ secret }), isAdmin, async (c) => {
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

// Mark a vendor as verified
app.put('/:id/verify', jwt({ secret }), isAdmin, async (c) => {
    const id = toInt(c.req.param('id'))
    const result = await db
        .update(groupsTable)
        .set({ verified: true, verifiedOn: new Date() })
        .where(eq(groupsTable.id, id))

    return c.json({ data: result, message: 'Group verified' })
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
