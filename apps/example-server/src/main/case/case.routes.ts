import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { casesTable } from '../../core/db/schema'
import { zDeleteCase, zInsertCase, zUpdateCase } from './case.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /cases - list all
app.get('/cases', authMiddleware, async (c) => {
    const cases = await db
        .select({ ...getTableColumns(casesTable) })
        .from(casesTable)
        .limit(100)

    return c.json({ data: cases, message: 'Cases list' })
})

// GET /cases/:id - find one
app.get('/cases/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const caseItem = await db
        .select({ ...getTableColumns(casesTable) })
        .from(casesTable)
        .where(eq(casesTable.id, id))
        .limit(1)

    if (caseItem.length === 0) {
        return c.json({ message: 'Case not found' }, 404)
    }

    return c.json({ data: caseItem[0], message: 'Case found' })
})

// POST /cases - create one
app.post(
    '/cases',
    zValidator('json', zInsertCase),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newCase = await db.insert(casesTable).values(body).returning()

        return c.json({ data: newCase, message: 'Case created' })
    },
)

// PATCH /cases/:id - update
app.patch(
    '/cases/:id',
    zValidator('json', zUpdateCase),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedCase = await db
            .update(casesTable)
            .set(body)
            .where(eq(casesTable.id, id))
            .returning()

        return c.json({ data: updatedCase, message: 'Case updated' })
    },
)

// DELETE /cases/:id - delete
app.delete('/cases/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(casesTable).where(eq(casesTable.id, id))

    return c.json({ message: 'Case deleted' })
})

// DELETE /cases - delete many
app.delete(
    '/cases',
    zValidator('json', zDeleteCase),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const caseId of body.caseIds) {
            await db.delete(casesTable).where(eq(casesTable.id, caseId))
        }

        return c.json({ message: 'Cases deleted' })
    },
)

export default app
