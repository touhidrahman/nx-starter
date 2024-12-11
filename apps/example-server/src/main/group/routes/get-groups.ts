import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { zSelectGroup } from '../group.schema'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { groupsTable } from '../../../core/db/schema'
import { db } from '../../../core/db/db'
import { toInt } from 'radash'

export const getGroupsRoute = createRoute({
    path: '/v1/group',
    tags: ['Group'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        query: zSelectGroup.extend({
            search: z.string().optional(),
            size: z.string().optional(),
            page: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectGroup), 'List of Groups'),
    },
})

export const getGroupsHandler: AppRouteHandler<typeof getGroupsRoute> = async (
    c,
) => {
    const payload = c.get('jwtPayload')
    const query = c.req.valid('query')

    const conditions: SQL<unknown>[] = []

    if (query.status) {
        conditions.push(eq(groupsTable.status, query.status))
    }

    if (query.type) {
        conditions.push(eq(groupsTable.type, query.type))
    }

    if (query.search) {
        const searchTerm = `%${query.search}%`
        conditions.push(
            sql`${ilike(groupsTable.name, searchTerm)} OR ${ilike(
                groupsTable.email,
                searchTerm,
            )}`,
        )
    }

    conditions.push(eq(groupsTable.ownerId, payload.groupId))

    const limit = query?.size ? toInt(query.size) : 10
    const offset = query?.page ? (toInt(query.page) - 1) * limit : 0

    const whereCondition =
        conditions.length > 0
            ? sql`${conditions.reduce(
                  (acc, condition, index) =>
                      index === 0 ? condition : sql`${acc} AND ${condition}`,
                  sql``,
              )}`
            : undefined

    const groups = await db
        .select({
            ...getTableColumns(groupsTable),
        })
        .from(groupsTable)
        .where(whereCondition)
        .limit(limit)
        .offset(offset)

    return c.json(
        {
            data: groups,
            message: 'Filtered Groups',
            success: true,
        },
        OK,
    )
}
