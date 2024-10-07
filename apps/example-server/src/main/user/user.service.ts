import dayjs from 'dayjs'
import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable, usersTable } from '../../core/db/schema'
import { UserDto } from './user.schema'

export async function findUsersByAuthUserId(authUserId: string) {
    const results = await db
        .select()
        .from(usersTable)
        .where(eq(authUsersTable.id, authUserId))

    return results
}

export async function findUserById(id: string) {
    return db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        with: { group: true },
    })
}

export async function findFirstUserByAuthUserId(authUserId: string) {
    return db.query.usersTable.findFirst({
        where: eq(usersTable.authUserId, authUserId),
        with: { group: true },
    })
}

export async function findUserByAuthUserIdAndGroupId(
    authUserId: string,
    groupId: string,
) {
    return db.query.usersTable.findFirst({
        where: and(
            eq(usersTable.authUserId, authUserId),
            eq(usersTable.groupId, groupId),
        ),
        with: { group: true },
    })
}

export async function findUserByUserIdAndGroupId(
    userId: string,
    groupId: string,
) {
    return db.query.usersTable.findFirst({
        where: and(eq(usersTable.id, userId), eq(usersTable.groupId, groupId)),
        with: { group: true },
    })
}

export async function countUsersByAuthUserId(authUserId: string) {
    const userCount = await db
        .select({ value: count() })
        .from(usersTable)
        .where(eq(usersTable.authUserId, authUserId))

    return userCount?.[0]?.value ?? 0
}

export async function createUser(user: UserDto) {
    return db.insert(usersTable).values(user).returning()
}

export async function updateUser(id: string, user: Partial<UserDto>) {
    return db
        .update(usersTable)
        .set(user)
        .where(eq(usersTable.id, id))
        .returning()
}

export async function deleteUser(id: string) {
    return db.delete(usersTable).where(eq(usersTable.id, id)).returning()
}

export async function userExists(id: string) {
    const userCount = await db
        .select({ value: count() })
        .from(usersTable)
        .where(eq(usersTable.id, id))

    return userCount?.[0]?.value === 1
}
