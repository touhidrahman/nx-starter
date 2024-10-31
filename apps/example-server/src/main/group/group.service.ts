import { eq, and, count, inArray } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable, groupsTable, usersTable } from '../../core/db/schema'
import { GroupDto } from './group.schema'
export class GroupService {
    async getDefaultGroup(authUserId: string) {
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

    async findGroupById(id: string) {
        const results = await db
            .select()
            .from(groupsTable)
            .where(and(eq(groupsTable.id, id)))
            .limit(1)

        return results?.[0] ?? null
    }

    async findGroupsByAuthUserId(authUserId: string) {
        const result = await db.query.usersTable.findMany({
            where: eq(usersTable.authUserId, authUserId),
            with: { group: true },
        })

        return result.map((u) => u.group)
    }

    async isOwner(userId: string, groupId: string) {
        const results = await db
            .select({ count: count() })
            .from(groupsTable)
            .where(
                and(
                    eq(groupsTable.id, groupId),
                    eq(groupsTable.ownerId, userId),
                ),
            )

        return results?.[0].count === 1
    }

    async isParticipant(userId: string, groupId: string) {
        const results = await db
            .select({ count: count() })
            .from(usersTable)
            .where(
                and(eq(usersTable.groupId, groupId), eq(usersTable.id, userId)),
            )

        return results?.[0].count === 1
    }

    async createGroup(group: GroupDto) {
        return db.insert(groupsTable).values(group).returning()
    }

    async updateGroup(id: string, group: Partial<GroupDto>) {
        return db
            .update(groupsTable)
            .set(group)
            .where(eq(groupsTable.id, id))
            .returning()
    }

    async deleteGroup(id: string) {
        return db.delete(groupsTable).where(eq(groupsTable.id, id)).returning()
    }

    async verifyGroup(id: string) {
        return db
            .update(groupsTable)
            .set({ verified: true, verifiedOn: new Date() })
            .where(eq(groupsTable.id, id))
            .returning()
    }

    async deleteManyGroups(ids: string[]) {
        return db
            .delete(groupsTable)
            .where(inArray(groupsTable.id, ids))
            .returning()
    }
}
export const groupService = new GroupService()
