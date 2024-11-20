import { createRoute, z } from '@hono/zod-openapi'
import { eq, getTableColumns, sql, SQL } from 'drizzle-orm'
import { toInt } from 'radash'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersTable } from '../../../core/db/schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSearchUser, zSelectUser } from '../user.schema'

export const getUsersRoute = createRoute({
    path: '/v1/user',
    method: 'get',
    tags: ['User'],
    middleware: [checkToken],
    request: {
        query: zSearchUser,
    },
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectUser),

            'List of Users',
        ),
    },
})

export const getUsersHandler: AppRouteHandler<typeof getUsersRoute> = async (
    c,
) => {
    const query = c.req.valid('query')
    const conditions: SQL[] = []

    query?.id && conditions.push(eq(usersTable.id, query?.id))
    query?.email && conditions.push(eq(usersTable.email, query?.email))
    query?.firstName &&
        conditions.push(eq(usersTable.firstName, query?.firstName))
    query?.lastName && conditions.push(eq(usersTable.lastName, query?.lastName))
    query?.groupId && conditions.push(eq(usersTable.groupId, query?.groupId))
    query?.authUserId &&
        conditions.push(eq(usersTable.authUserId, query?.authUserId))
    query?.city && conditions.push(eq(usersTable.city, query?.city))
    query?.country && conditions.push(eq(usersTable.country, query?.country))
    query?.postCode && conditions.push(eq(usersTable.postCode, query?.postCode))
    query?.role && conditions.push(eq(usersTable.role, query?.role))

    const limit = query?.size ? toInt(query?.size) : 10
    const offset = (query?.page ? toInt(query?.page) : 0) * limit

    const users = await db
        .select({ ...getTableColumns(usersTable) })
        .from(usersTable)
        .where(
            // TODO verify if this is correct
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

    return c.json(jsonResponse(users, 'List of users', OK), OK)
}
