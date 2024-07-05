import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { subscriptionsTable } from '../../core/db/schema'
import {
    zDeleteSubscription,
    zInsertSubscription,
    zUpdateSubscription,
} from './subscription.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /subscriptions - list all
app.get('/subscriptions', authMiddleware, async (c) => {
    const subscriptions = await db
        .select({ ...getTableColumns(subscriptionsTable) })
        .from(subscriptionsTable)
        .limit(100)

    return c.json({ data: subscriptions, message: 'Subscriptions list' })
})

// GET /subscriptions/:id - find one
app.get('/subscriptions/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const subscription = await db
        .select({ ...getTableColumns(subscriptionsTable) })
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.id, id))
        .limit(1)

    if (subscription.length === 0) {
        return c.json({ message: 'Subscription not found' }, 404)
    }

    return c.json({ data: subscription[0], message: 'Subscription found' })
})

// POST /subscriptions - create one
app.post(
    '/subscriptions',
    zValidator('json', zInsertSubscription),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newSubscription = await db
            .insert(subscriptionsTable)
            .values(body)
            .returning()

        return c.json({
            data: newSubscription,
            message: 'Subscription created',
        })
    },
)

// PATCH /subscriptions/:id - update
app.patch(
    '/subscriptions/:id',
    zValidator('json', zUpdateSubscription),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedSubscription = await db
            .update(subscriptionsTable)
            .set(body)
            .where(eq(subscriptionsTable.id, id))
            .returning()

        return c.json({
            data: updatedSubscription,
            message: 'Subscription updated',
        })
    },
)

// DELETE /subscriptions/:id - delete
app.delete('/subscriptions/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(subscriptionsTable).where(eq(subscriptionsTable.id, id))

    return c.json({ message: 'Subscription deleted' })
})

// DELETE /subscriptions - delete many
app.delete(
    '/subscriptions',
    zValidator('json', zDeleteSubscription),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const subscriptionId of body.subscriptionIds) {
            await db
                .delete(subscriptionsTable)
                .where(eq(subscriptionsTable.id, subscriptionId))
        }

        return c.json({ message: 'Subscriptions deleted' })
    },
)

export default app
