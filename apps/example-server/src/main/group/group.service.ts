import { eq, and } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { groupsTable, groupsToUsersTable } from '../../core/db/schema'

export async function getDefaultGroup(userId: number) {
    const results = await db
        .select({
            id: groupsTable.id,
            type: groupsTable.type,
            roleId: groupsToUsersTable.roleId,
        })
        .from(groupsTable)
        .innerJoin(
            groupsToUsersTable,
            eq(groupsTable.id, groupsToUsersTable.groupId),
        )
        .where(
            and(
                eq(groupsToUsersTable.isDefault, true),
                eq(groupsToUsersTable.userId, userId),
            ),
        )
        .limit(1)

    return results?.[0] ?? null
}

export async function getGroup(id: number) {
    const results = await db
        .select({
            id: groupsTable.id,
            type: groupsTable.type,
            roleId: groupsToUsersTable.roleId,
        })
        .from(groupsTable)
        .innerJoin(
            groupsToUsersTable,
            eq(groupsTable.id, groupsToUsersTable.groupId),
        )
        .where(and(eq(groupsTable.id, id)))
        .limit(1)

    return results?.[0] ?? null
}
