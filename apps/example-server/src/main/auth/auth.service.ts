import dayjs from 'dayjs'
import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable, usersTable } from '../../core/db/schema'

export async function updateLastLogin(authUserId: number) {
    await db
        .update(authUsersTable)
        .set({ lastLogin: dayjs().toDate() })
        .where(eq(authUsersTable.id, authUserId))
}

export async function isFirstAuthUser() {
    const userCount = await db.select({ value: count() }).from(authUsersTable)

    return userCount?.[0]?.value === 0
}

export async function findAuthUserById(id: number) {
    const results = await db
        .select()
        .from(authUsersTable)
        .where(eq(authUsersTable.id, id))
        .limit(1)

    return results?.[0] ?? null
}

export async function findAuthUserByEmail(email: string) {
    const results = await db
        .select()
        .from(authUsersTable)
        .where(eq(authUsersTable.email, email))
        .limit(1)

    return results?.[0] ?? null
}

export async function countAuthUserByEmail(email: string) {
    const userCount = await db
        .select({ value: count() })
        .from(authUsersTable)
        .where(eq(authUsersTable.email, email))

    return userCount?.[0]?.value ?? 0
}

export async function findUsersByAuthUserId(authUserId: number) {
    const results = await db
        .select()
        .from(authUsersTable)
        .where(eq(authUsersTable.id, authUserId))

    return results
}

export async function findFirstUserByAuthUserId(authUserId: number) {
    return db.query.usersTable.findFirst({
        where: eq(usersTable.authUserId, authUserId),
        with: { group: true },
    })
}

export async function findUserByAuthUserIdAndGroupId(
    authUserId: number,
    groupId: number,
) {
    return db.query.usersTable.findFirst({
        where: and(
            eq(usersTable.authUserId, authUserId),
            eq(usersTable.groupId, groupId),
        ),
        with: { group: true },
    })
}

export async function countUsersByAuthUserId(authUserId: number) {
    const userCount = await db
        .select({ value: count() })
        .from(usersTable)
        .where(eq(usersTable.authUserId, authUserId))

    return userCount?.[0]?.value ?? 0
}
