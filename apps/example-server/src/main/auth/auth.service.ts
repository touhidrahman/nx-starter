import dayjs from 'dayjs'
import { eq } from 'drizzle-orm'
import { db } from '../../core/db/db'
import { authUsersTable } from '../../core/db/schema'

export async function updateLastLogin(authUserId: number) {
    await db
        .update(authUsersTable)
        .set({ lastLogin: dayjs().toDate() })
        .where(eq(authUsersTable.id, authUserId))
}
