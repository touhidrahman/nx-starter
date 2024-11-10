import { eq, and, inArray, getTableColumns } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { subscriptionsTable } from '../../core/db/schema'
import { InsertSubscription } from './subscription.schema'

// Find all subscriptions by groupId
export const findAllByGroupId = async (groupId: string) => {
    return db
        .select(getTableColumns(subscriptionsTable))
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.groupId, groupId))
        .limit(100)
}

// Find a subscription by ID
export const findById = async (id: string) => {
    const subscription = await db
        .select(getTableColumns(subscriptionsTable))
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.id, id))
        .limit(1)

    return subscription[0] || null
}

// Create a new subscription
export const create = async (subscription: InsertSubscription) => {
    return db.insert(subscriptionsTable).values(subscription).returning()
}

// Update an existing subscription by ID
export const updateById = async (
    id: string,
    groupId: string,
    updateData: Partial<InsertSubscription>,
) => {
    return db
        .update(subscriptionsTable)
        .set(updateData)
        .where(
            and(
                eq(subscriptionsTable.id, id),
                eq(subscriptionsTable.groupId, groupId),
            ),
        )
        .returning()
}

// Delete a subscription by ID
export const deleteById = async (id: string) => {
    return await db
        .delete(subscriptionsTable)
        .where(eq(subscriptionsTable.id, id))
        .returning()
}

// Delete multiple subscriptions by IDs and groupId
export const deleteManyByIds = async (ids: string[], groupId: string) => {
    return db
        .delete(subscriptionsTable)
        .where(
            and(
                inArray(subscriptionsTable.id, ids),
                eq(subscriptionsTable.groupId, groupId),
            ),
        )
        .returning()
}
