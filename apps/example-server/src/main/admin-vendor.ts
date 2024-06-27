import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns, inArray } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { decode, jwt } from 'hono/jwt'
import { toInt } from 'radash'
import { db } from '../core/db/db'
import { idsSchema } from '../core/db/schema/common.schema'
import {
    vendorsTable,
    insertVendorSchema,
    updateVendorSchema,
} from '../core/db/schema/vendor.schema'

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
        .select({ ...getTableColumns(vendorsTable) })
        .from(vendorsTable)
        .limit(10)
        .offset(0)

    return c.json({ data: result, message: 'Vendor list' })
})

// Get a vendor by ID
app.get('/:id', async (c) => {
    const id = toInt(c.req.param('id'))
    const result = await db
        .select({ ...getTableColumns(vendorsTable) })
        .from(vendorsTable)
        .where(eq(vendorsTable.id, id))
        .limit(1)

    if (result.length === 0) {
        return c.json({ error: 'Vendor not found' }, 404)
    }

    return c.json({ data: result[0], message: 'Vendor details' })
})

// Create a new vendor
app.post('/', zValidator('json', insertVendorSchema), async (c) => {
    const body = await c.req.valid('json')
    const result = await db.insert(vendorsTable).values(body).returning()

    return c.json({ data: result, message: 'Vendor created' }, 201)
})

// Update a vendor by ID
app.put('/:id', zValidator('json', updateVendorSchema), async (c) => {
    const id = toInt(c.req.param('id'))

    const body = await c.req.valid('json')
    const result = await db
        .update(vendorsTable)
        .set(body)
        .where(eq(vendorsTable.id, id))
        .returning()

    if (result.length === 0) {
        return c.json({ error: 'Vendor not found' }, 404)
    }

    return c.json({ data: result[0], message: 'Vendor updated' })
})

// Delete a vendor by ID
app.delete('/:id', async (c) => {
    const id = toInt(c.req.param('id'))
    const result = await db
        .delete(vendorsTable)
        .where(eq(vendorsTable.id, id))
        .returning()

    if (result.length === 0) {
        return c.json({ error: 'Vendor not found' }, 404)
    }

    return c.json({ data: result, message: 'Vendor deleted' })
})

// Delete many vendors
app.delete('/', zValidator('json', idsSchema), async (c) => {
    const { ids } = await c.req.json()
    const result = await db
        .delete(vendorsTable)
        .where(inArray(vendorsTable.id, ids))
        .returning()

    return c.json({
        message: 'Vendors with given IDs deleted',
        count: result.length,
    })
})

export default app
