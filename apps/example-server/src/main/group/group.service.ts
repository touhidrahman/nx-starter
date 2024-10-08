import { eq, and, count, inArray } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable, groupsTable, usersTable } from '../../core/db/schema'
import { GroupDto } from './group.schema'

export async function getDefaultGroup(authUserId: string) {
    const results = await db
        .select()
        .from(groupsTable)
        .innerJoin(
            authUsersTable,
            eq(groupsTable.id, authUsersTable.defaultGroupId),
        )
        .where(and(eq(authUsersTable.id, authUserId)))
        .limit(1)

    return results?.[0] ?? null
}

export async function findGroupById(id: string) {
    const results = await db
        .select()
        .from(groupsTable)
        .where(and(eq(groupsTable.id, id)))
        .limit(1)

    return results?.[0] ?? null
}

export async function findGroupsByAuthUserId(authUserId: string) {
    const result = await db.query.usersTable.findMany({
        where: eq(usersTable.authUserId, authUserId),
        with: { group: true },
    })

    return result.map((u) => u.group)
}

export async function isOwner(userId: string, groupId: string) {
    const results = await db
        .select({ count: count() })
        .from(groupsTable)
        .where(
            and(eq(groupsTable.id, groupId), eq(groupsTable.ownerId, userId)),
        )

    return results?.[0].count === 1
}

export async function isParticipant(userId: string, groupId: string) {
    const results = await db
        .select({ count: count() })
        .from(usersTable)
        .where(and(eq(usersTable.groupId, groupId), eq(usersTable.id, userId)))

    return results?.[0].count === 1
}

export async function createGroup(group: GroupDto) {
    return db.insert(groupsTable).values(group).returning()
}

export async function updateGroup(id: string, group: Partial<GroupDto>) {
    return db
        .update(groupsTable)
        .set(group)
        .where(eq(groupsTable.id, id))
        .returning()
}

export async function deleteGroup(id: string) {
    return db.delete(groupsTable).where(eq(groupsTable.id, id)).returning()
}

export async function verifyGroup(id: string) {
    return db
        .update(groupsTable)
        .set({ verified: true, verifiedOn: new Date() })
        .where(eq(groupsTable.id, id))
        .returning()
}

export async function deleteManyGroups(ids: string[]) {
    return db
        .delete(groupsTable)
        .where(inArray(groupsTable.id, ids))
        .returning()
}
