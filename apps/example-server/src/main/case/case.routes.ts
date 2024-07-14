import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Context, Hono, Next } from 'hono'
import { toInt } from 'radash'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { casesTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import { zDeleteCase, zInsertCase, zUpdateCase } from './case.schema'

const app = new Hono()

const checkCaseOwnershipMiddleware = async (ctx: Context, next: Next) => {
    const payload = await ctx.get('jwtPayload')

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
    const payload = await c.get('jwtPayload')

    try {
        const groupId = toInt(payload.groupId)
        const cases = await db
            .select({ ...getTableColumns(casesTable) })
            .from(casesTable)
            .where(eq(casesTable.groupId, groupId))
            .limit(100)

        return c.json({ data: cases, message: 'Cases list' })
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }
})

// GET /:id - find one
app.get(
    '/:id',
    authMiddleware,
    zValidator('param', z.object({ id: z.coerce.number() })),
    checkCaseOwnershipMiddleware,
    async (c) => {
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
    },
)

// POST  - create one
app.post('', zValidator('json', zInsertCase), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newCase = await db.insert(casesTable).values(body).returning()

    return c.json({ data: newCase, message: 'Case created' })
})

// PATCH /:id - update
app.patch(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator('json', zUpdateCase),
    authMiddleware,
    checkCaseOwnershipMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedCase = await db
            .update(casesTable)
            .set(body)
            .where(
                and(
                    eq(casesTable.id, id),
                    eq(casesTable.groupId, payload.groupId),
                ),
            )
            .returning()

        return c.json({ data: updatedCase, message: 'Case updated' })
    },
)

// DELETE /:id - delete
app.delete(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    authMiddleware,
    checkCaseOwnershipMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)

        await db.delete(casesTable).where(eq(casesTable.id, id))

        return c.json({ message: 'Case deleted' })
    },
)

// DELETE  - delete many
app.delete('', zValidator('json', zDeleteCase), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    for (const caseId of body.caseIds) {
        await db.delete(casesTable).where(eq(casesTable.id, caseId))
    }

    return c.json({ message: 'Cases deleted' })
})

export default app
