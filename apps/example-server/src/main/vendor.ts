import { SQL, eq, getTableColumns, inArray, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../core/db/db'
import { InsertVendor, usersTable, vendorsTable } from '../core/db/schema'
import { safeUser } from '../core/utils/user.util'
import { z } from 'zod'
import { toInt } from 'radash'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// Get all vendors
// TODO: implement pagination
app.get('/', async (c) => {
    console.log('TCL: ~ here ')
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
app.post('/', async (c) => {
    const vendorValidationSchema = z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        country: z.string(),
        postCode: z.string(),
        verified: z.boolean().default(false),
        verifiedOn: z.date().optional(),
        isTrialing: z.boolean().default(true),
        nextBillingDate: z.date().optional(),
        nextRenewalDate: z.date().optional(),
        subscription: z.string().optional(),
    })
    const body = await c.req.json()
    const vendor: InsertVendor = vendorValidationSchema.parse(body)
    const result = await db.insert(vendorsTable).values(vendor).returning()
    return c.json({ data: result, message: 'Vendor created' }, 201)
})

// Update a vendor by ID
app.put('/:id', async (c) => {
    const id = toInt(c.req.param('id'))
    const vendorValidationSchema = z.object({
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        postCode: z.string().optional(),
        verified: z.boolean().optional(),
        verifiedOn: z.date().optional(),
        isTrialing: z.boolean().optional(),
        nextBillingDate: z.date().optional(),
        nextRenewalDate: z.date().optional(),
        subscription: z.string().optional(),
    })
    const body = await c.req.json()
    const vendorUpdates = vendorValidationSchema.parse(body)
    const result = await db
        .update(vendorsTable)
        .set(vendorUpdates)
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
    return c.json({ message: 'Vendor deleted' })
})

// Delete all vendors
app.delete('/', async (c) => {
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
