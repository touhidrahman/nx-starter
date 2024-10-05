import dayjs from 'dayjs'
import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable, usersTable } from '../../core/db/schema'
import { UserDto } from './user.schema'

export async function findUsersByAuthUserId(authUserId: number) {
    const results = await db
        .select()
        .from(usersTable)
        .where(eq(authUsersTable.id, authUserId))

    return results
}

export async function findUserById(id: number) {
    return db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        with: { group: true },
    })
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

export async function createUser(user: UserDto) {
    return db.insert(usersTable).values(user).returning()
}

export async function updateUser(id: number, user: Partial<UserDto>) {
    return db
        .update(usersTable)
        .set(user)
        .where(eq(usersTable.id, id))
        .returning()
}

export async function deleteUser(id: number) {
    return db.delete(usersTable).where(eq(usersTable.id, id)).returning()
}
