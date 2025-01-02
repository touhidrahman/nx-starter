import dayjs from 'dayjs'
import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { usersGroupsTable, usersTable } from '../../core/db/schema'

export async function updateLastLogin(userId: string) {
    await db
        .update(usersTable)
        .set({ lastLogin: dayjs().toDate() })
        .where(eq(usersTable.id, userId))
}

export async function isFirstUser() {
    const userCount = await db.select({ value: count() }).from(usersTable)

    return userCount?.[0]?.value === 0
}

export async function findUserByEmail(email: string) {
    const results = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1)

    return results?.[0] ?? null
}

export async function setDefaultGroupId(
    userId: string,
    groupId: string | null,
) {
    return db
        .update(usersTable)
        .set({ defaultGroupId: groupId })
        .where(eq(usersTable.id, userId))
        .returning()
}

export async function getRoleByUserAndGroup(userId: string, groupId: string) {
    return db.query.usersGroupsTable.findFirst({
        where: and(
            eq(usersGroupsTable.userId, userId),
            eq(usersGroupsTable.groupId, groupId),
        ),
    })
}
