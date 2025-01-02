import { createRoute, z } from '@hono/zod-openapi'
import { eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { toInt } from 'radash'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import {
    groupsTable,
    usersGroupsTable,
    usersTable,
} from '../../../core/db/schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSearchUser, zSelectUser } from '../user.schema'

export const getUsersRoute = createRoute({
    path: '/v1/user',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        query: zSearchUser,
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectUser), 'List of Users'),
    },
})

export const getUsersHandler: AppRouteHandler<typeof getUsersRoute> = async (
    c,
) => {
    const query = c.req.valid('query')
    const conditions: SQL<unknown>[] = []

    // Add specific filters to conditions dynamically
    query?.id && conditions.push(eq(usersTable.id, query.id))
    query?.email && conditions.push(eq(usersTable.email, query.email))
    query?.firstName &&
        conditions.push(eq(usersTable.firstName, query.firstName))
    query?.lastName && conditions.push(eq(usersTable.lastName, query.lastName))
    query?.city && conditions.push(eq(usersTable.city, query.city))
    query?.country && conditions.push(eq(usersTable.country, query.country))
    query?.postCode && conditions.push(eq(usersTable.postCode, query.postCode))

    // Filters from groupsTable
    query?.groupType &&
        conditions.push(
            eq(groupsTable.type, query.groupType as 'client' | 'vendor'),
        )
    // Filter by userType from authUserTable

    query?.status &&
        conditions.push(
            eq(
                usersTable.status,
                query.status as 'active' | 'inactive' | 'banned',
            ),
        )
    query?.level &&
        conditions.push(
            eq(usersTable.level, query.level as 'user' | 'moderator' | 'admin'),
        )

    // Search by name or email
    if (query?.search) {
        const searchTerm = `%${query.search}%`
        conditions.push(
            sql`${ilike(usersTable.email, searchTerm)} OR ${ilike(
                sql`LOWER(${usersTable.firstName} || ' ' || ${usersTable.lastName})`,
                searchTerm,
            )}`,
        )
    }

    // Pagination
    const limit = query?.size ? toInt(query.size) : 10
    const offset = query?.page ? (toInt(query.page) - 1) * limit : 0

    const users = await db
        .select({
            ...getTableColumns(usersTable),
        })
        .from(usersTable)
        .leftJoin(
            usersGroupsTable,
            eq(usersGroupsTable.groupId, groupsTable.id),
        )
        .leftJoin(usersGroupsTable, eq(usersGroupsTable.userId, usersTable.id))
        .where(
            conditions.length
                ? sql`${conditions.reduce(
                      (acc, condition, index) =>
                          index === 0
                              ? condition
                              : sql`${acc} AND ${condition}`,
                      sql``,
                  )}`
                : undefined,
        )
        .limit(limit)
        .offset(offset)

    const serializedUsers = users.map((user) => ({
        ...user,
        password: '',
        status: user.status ?? undefined,
        updatedAt: user.updatedAt.toISOString(),
    }))

    return c.json(
        { data: serializedUsers, message: 'List of users', success: true },
        OK,
    )
}
