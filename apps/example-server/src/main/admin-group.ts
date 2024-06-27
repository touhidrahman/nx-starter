import { getTableColumns } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../core/db/db'
import { groupsTable } from '../core/db/schema/group.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })
const isSuperAdmin = async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')
    console.log('TCL: | isSuperAdmin | payload:', payload)
    if (payload.type !== 'user') {
        return ctx.json({ error: 'Unauthorized' }, 403)
    }

    return next()
}

// Mark a vendor as verified
app.get('/verify', authMiddleware, isSuperAdmin, async (c) => {
    const result = await db
        .select({ ...getTableColumns(groupsTable) })
        .from(groupsTable)
        .limit(10)
        .offset(0)

    return c.json({ data: result, message: 'Vendor list' })
})

export default app
