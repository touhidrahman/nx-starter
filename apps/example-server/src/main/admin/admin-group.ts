import { getTableColumns, eq } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { toInt } from 'radash'
import { groupsTable } from '../../core/db/schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const isSuperAdmin = async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')
    console.log('TCL: | isSuperAdmin | payload:', payload)
    if (payload.type !== 'admin') {
        return ctx.json({ error: 'Unauthorized' }, 403)
    }

    return next()
}

// Mark a vendor as verified
app.get('/verify', jwt({ secret }), isSuperAdmin, async (c) => {
    const result = await db
        .select({ ...getTableColumns(groupsTable) })
        .from(groupsTable)
        .limit(10)
        .offset(0)

    return c.json({ data: result, message: 'Vendor list' })
})

app.get('/:id', jwt({ secret }), async (c) => {
    const id = toInt(c.req.param('id'))
    const user = c.get('jwtPayload')

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

export default app
