import { db } from '../../core/db/db'
import { and, eq, count, getTableColumns } from 'drizzle-orm'
import { usersTable } from '../../core/db/schema'
import { sql } from 'drizzle-orm'

export async function getAdminUsers(page?: number, pageSize?: number) {
    const query = db
        .select({
            ...getTableColumns(usersTable),
        })
        .from(usersTable)

    if (page && pageSize) {
        const offset = (page - 1) * pageSize

        // Total count of admin users
        const totalUsersResult = await db
            .select({ count: sql`COUNT(*)` })
            .from(usersTable)

        const totalUsers = Number(totalUsersResult[0]?.count) || 0

        // Paginated users
        const users = await query.limit(pageSize).offset(offset)

        return {
            data: users,
            meta: {
                total: totalUsers,
                page,
                size: pageSize,
                totalPages: Math.ceil(totalUsers / pageSize),
            },
            message: 'List of Admin Users',
            code: 200,
        }
    } else {
        // Fetch all admin users
        const users = await query
        return {
            data: users,
            meta: {
                total: users.length,
                page: 1,
                size: users.length,
                totalPages: 1,
            },
            message: 'List of Admin Users',
            code: 200,
        }
    }
}

// Approve an admin user by setting verified to true
export async function approveAdminUser(userId: string) {
    try {
        const result = await db
            .update(usersTable)
            .set({ verified: true })
            .where(
                and(
                    eq(usersTable.id, userId),
                    eq(usersTable.level, 'admin'),
                ),
            )
            .returning()

        if (result.length === 0) {
            return {
                message: 'User not found or already approved',
                code: 404,
            }
        }

        return { message: 'Admin account approved', code: 200 }
    } catch (error) {
        throw new Error('Approval failed')
    }
}

// Promote a user to admin level
export async function makeUserAdmin(userId: string) {
    try {
        const result = await db
            .update(usersTable)
            .set({ level: 'admin' })
            .where(eq(usersTable.id, userId))
            .returning()

        if (result.length === 0) {
            return { message: 'User not found', code: 404 }
        }

        return { message: 'User promoted to admin', code: 200 }
    } catch (error) {
        throw new Error('Promotion failed')
    }
}

// Check if a user exists by ID
export async function adminUserExists(userId: string) {
    const userCount = await db
        .select({ value: count() })
        .from(usersTable)
        .where(eq(usersTable.id, userId))

    return userCount?.[0]?.value === 1
}

// Get specific admin user by ID
export async function getAdminUserById(userId: string) {
    const user = await db
        .select({
            ...getTableColumns(usersTable),
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1)

    return user[0] || null
}
