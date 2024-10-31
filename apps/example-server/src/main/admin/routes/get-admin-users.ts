import { createRoute, z } from '@hono/zod-openapi'
import { eq, getTableColumns, sql, SQL } from 'drizzle-orm'
import { toInt } from 'radash'
import { OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { authUsersTable } from '../../../core/db/schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSearchAdminUser, zSelectAdminUser } from '../admin-user.schema'


export const getAdminUsersRoute = createRoute({
    path: '/v1/admin-users',
    method: 'get',
    tags: ['AdminUser'],
    middleware: [checkToken],
    request: {
        query: zSearchAdminUser,
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectAdminUser), 'List of Admin Users'),
    },
})


export const getAdminUsersHandler: AppRouteHandler<typeof getAdminUsersRoute> = async (
    c,
) => {
    const query = c.req.valid('query')
    const conditions: SQL[] = []


    conditions.push(eq(authUsersTable.level, 'admin'))

    const limit = query?.size ? toInt(query?.size) : 10
    const offset = (query?.page ? toInt(query?.page) : 0) * limit

    const adminUsers = await db
        .select({ ...getTableColumns(authUsersTable) })
        .from(authUsersTable)
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

    return c.json({
        data: adminUsers,
        meta: {
            total: adminUsers.length,
            page: query?.page || 1,
            size: limit,
        },
        message: 'List of Admin Users',
        code: OK,
    })
}
