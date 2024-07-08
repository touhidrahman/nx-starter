import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { casesTable } from '../../core/db/schema'
import { zDeleteCase, zInsertCase, zUpdateCase } from './case.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

const checkCaseOwnershipMiddleware = async (ctx: Context, next: Next) => {
    const payload = await ctx.get('jwtPayload')
    if (!payload) {
        return ctx.json(
            { error: 'Unauthorized', message: 'Not authenticated' },
            403,
        )
    }

    const caseId = parseInt(ctx.req.param('id'), 10)

    const caseItem = await db
        .select({ ...getTableColumns(casesTable) })
        .from(casesTable)
        .where(eq(casesTable.id, caseId))
        .limit(1)

    if (caseItem.length === 0) {
        return ctx.json({ error: 'Not found', message: 'Case not found' }, 404)
    }

    if (caseItem[0].groupId !== payload.groupId) {
        return ctx.json(
            { error: 'Unauthorized', message: 'Access denied' },
            403,
        )
    }

    ctx.set('caseItem', caseItem[0])
    await next()
}

// GET  - list all
app.get('', authMiddleware, async (c) => {
    const cases = await db
        .select({ ...getTableColumns(casesTable) })
        .from(casesTable)
        .limit(100)

    return c.json({ data: cases, message: 'Cases list' })
})

// GET /:id - find one
app.get('/:id', authMiddleware, checkCaseOwnershipMiddleware, async (c) => {
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

// POST  - create one
app.post(
    '',
    zValidator('json', zInsertCase),
    authMiddleware,
    checkCaseOwnershipMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newCase = await db.insert(casesTable).values(body).returning()

        return c.json({ data: newCase, message: 'Case created' })
    },
)

// PATCH /:id - update
app.patch(
    '/:id',
    zValidator('json', zUpdateCase),
    authMiddleware,
    checkCaseOwnershipMiddleware,
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

// DELETE /:id - delete
app.delete('/:id', authMiddleware, checkCaseOwnershipMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(casesTable).where(eq(casesTable.id, id))

    return c.json({ message: 'Case deleted' })
})

// DELETE  - delete many
app.delete(
    '',
    zValidator('json', zDeleteCase),
    authMiddleware,
    checkCaseOwnershipMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const caseId of body.caseIds) {
            await db.delete(casesTable).where(eq(casesTable.id, caseId))
        }

        return c.json({ message: 'Cases deleted' })
    },
)

export default app
