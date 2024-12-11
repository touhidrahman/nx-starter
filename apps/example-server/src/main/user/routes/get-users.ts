import { createRoute, z } from '@hono/zod-openapi'
import { eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { toInt } from 'radash'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import {
    usersTable,
    groupsTable,
    authUsersTable,
    userStatusEnum,
    userLevelEnum,
    groupTypeEnum,
} from '../../../core/db/schema' // Include authUserTable
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSearchUser, zSelectUser } from '../user.schema'

export const getUsersRoute = createRoute({
    path: '/v1/user',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        query: zSearchUser.extend({
            status: z.string().optional(),
            groupType: z.string().optional(),
            authUserType: z.string().optional(), // Level from authUserTable
            search: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(
            z.array(
                zSelectUser.extend({
                    status: z.enum(userStatusEnum.enumValues).optional(),
                    groupType: z.enum(groupTypeEnum.enumValues).optional(),
                    authUserType: z.enum(userLevelEnum.enumValues).optional(),
                }),
            ),
            'List of Users',
        ),
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
    query?.groupId && conditions.push(eq(usersTable.groupId, query.groupId))
    query?.authUserId &&
        conditions.push(eq(usersTable.authUserId, query.authUserId))
    query?.city && conditions.push(eq(usersTable.city, query.city))
    query?.country && conditions.push(eq(usersTable.country, query.country))
    query?.postCode && conditions.push(eq(usersTable.postCode, query.postCode))
    query?.role && conditions.push(eq(usersTable.role, query.role))

    // Filters from groupsTable
    query?.groupType &&
        conditions.push(
            eq(groupsTable.type, query.groupType as 'client' | 'vendor'),
        )
    // Filter by userType from authUserTable

    query?.status &&
        conditions.push(
            eq(
                authUsersTable.status,
                query.status as 'active' | 'inactive' | 'banned',
            ),
        )
    query?.authUserType &&
        conditions.push(
            eq(
                authUsersTable.level,
                query.authUserType as 'user' | 'moderator' | 'admin',
            ),
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
            status: authUsersTable.status,
            authUserType: authUsersTable.level,
            groupType: groupsTable.type,
        })
        .from(usersTable)
        .leftJoin(groupsTable, eq(usersTable.groupId, groupsTable.id))
        .leftJoin(authUsersTable, eq(usersTable.authUserId, authUsersTable.id))
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
        status: user.status ?? undefined,
        authUserType: user.authUserType ?? undefined,
        groupType: user.groupType ?? undefined,
        updatedAt: user.updatedAt.toISOString(),
    }))

    return c.json(
        { data: serializedUsers, message: 'List of users', success: true },
        OK,
    )
}
