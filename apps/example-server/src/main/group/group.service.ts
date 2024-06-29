import { eq, and } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { groupsTable, groupToUsersTable } from '../../core/db/schema'

export async function getDefaultGroup(userId: number) {
    const results = await db
        .select({
            id: groupsTable.id,
            type: groupsTable.type,
            roleId: groupToUsersTable.roleId,
        })
        .from(groupsTable)
        .innerJoin(
            groupToUsersTable,
            eq(groupsTable.id, groupToUsersTable.groupId),
        )
        .where(
            and(
                eq(groupToUsersTable.isDefault, true),
                eq(groupToUsersTable.userId, userId),
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
            roleId: groupToUsersTable.roleId,
        })
        .from(groupsTable)
        .innerJoin(
            groupToUsersTable,
            eq(groupsTable.id, groupToUsersTable.groupId),
        )
        .where(and(eq(groupsTable.id, id)))
        .limit(1)

    return results?.[0] ?? null
}
