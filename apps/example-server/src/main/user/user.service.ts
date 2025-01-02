import { and, count, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { usersTable } from '../../core/db/schema'
import { UserDto } from './user.schema'

export async function findUserById(id: string) {
    return db.query.usersTable.findFirst({
        where: eq(usersTable.id, id),
        with: { group: true },
    })
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

export const updateProfile = async (
    userId: string,
    updates: Record<string, any>,
    options?: { restrictFields?: string[] },
) => {
    const restrictFields = options?.restrictFields || []
    const allowedUpdates = Object.fromEntries(
        Object.entries(updates).filter(
            ([key]) => !restrictFields.includes(key),
        ),
    )

    if (Object.keys(allowedUpdates).length === 0) {
        return [null] // No valid updates
    }

    const [updatedUser] = await db
        .update(usersTable)
        .set(allowedUpdates)
        .where(eq(usersTable.id, userId))
        .returning() // Return the updated user

    return [updatedUser]
}

export const updateUserProfilePictureUrl = (url: string, userId: string) => {
    return db
        .update(usersTable)
        .set({ profilePhoto: url })
        .where(eq(usersTable.id, userId))
        .returning()
}
