import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { subscriptionsTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkSubscriptionOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import { zId, zIds } from '../../core/models/common.schema'
import { zInsertSubscription, zUpdateSubscription } from './subscription.schema'

const app = new Hono()

// GET /subscriptions - list all
app.get('', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const subscriptions = await db
            .select({ ...getTableColumns(subscriptionsTable) })
            .from(subscriptionsTable)
            .where(eq(subscriptionsTable.groupId, groupId))
            .limit(100)

        return c.json({ data: subscriptions, message: 'Subscriptions list' })
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }
})

// GET /subscriptions/:id - find one
app.get(
    '/:id',
    authMiddleware,
    zValidator('param', z.object({ id: z.coerce.number() })),
    checkSubscriptionOwnershipMiddleware(subscriptionsTable, 'Subscription'),
    async (c) => {
        const id = c.req.param('id')
        const subscription = await db
            .select({ ...getTableColumns(subscriptionsTable) })
            .from(subscriptionsTable)
            .where(eq(subscriptionsTable.id, id))
            .limit(1)

        if (subscription.length === 0) {
            return c.json({ message: 'Subscription not found' }, 404)
        }

        return c.json({ data: subscription[0], message: 'Subscription found' })
    },
)

// POST /subscriptions - create one
app.post(
    '',
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
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator('json', zUpdateSubscription),
    authMiddleware,
    checkSubscriptionOwnershipMiddleware(subscriptionsTable, 'Subscription'),
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedSubscription = await db
            .update(subscriptionsTable)
            .set(body)
            .where(
                and(
                    eq(subscriptionsTable.id, id),
                    eq(subscriptionsTable.groupId, payload.groupId),
                ),
            )
            .returning()

        return c.json({
            data: updatedSubscription,
            message: 'Subscription updated',
        })
    },
)

// DELETE /subscriptions/:id - delete
app.delete(
    '/:id',
    zValidator('param', zId),
    authMiddleware,
    checkSubscriptionOwnershipMiddleware(subscriptionsTable, 'Subscription'),
    async (c) => {
        const id = c.req.param('id')

        await db.delete(subscriptionsTable).where(eq(subscriptionsTable.id, id))

        return c.json({ message: 'Subscription deleted' })
    },
)

// DELETE /subscriptions - delete many
app.delete('', zValidator('json', zIds), authMiddleware, async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        for (const subscriptionId of body.ids) {
            await db
                .delete(subscriptionsTable)
                .where(
                    and(
                        eq(subscriptionsTable.id, subscriptionId),
                        eq(subscriptionsTable.groupId, payload.groupId),
                    ),
                )
        }
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }

    return c.json({ message: 'Subscriptions deleted' })
})

export default app
