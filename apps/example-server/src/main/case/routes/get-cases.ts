import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectCase } from '../case.schema'
import { zSelectGroup } from '../../group/group.schema'
import { eq, getTableColumns, ilike, sql, SQL } from 'drizzle-orm'
import { casesTable, groupsTable } from '../../../core/db/schema'
import { toInt } from 'radash'
import { db } from '../../../core/db/db'

export const getCasesRoute = createRoute({
    path: '/v1/cases',
    method: 'get',
    tags: ['Case'],
    middleware: [checkToken] as const,
    request: {
        query: zSelectGroup.extend({
            search: z.string().optional(),
            size: z.string().optional(),
            page: z.string().optional(),
        }),
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectCase), 'List of Cases'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No cases found'),
    },
})

export const getCasesHandler: AppRouteHandler<typeof getCasesRoute> = async (
    c,
) => {
    const payload = await c.get('jwtPayload')
    const query = c.req.valid('query')
    const groupId = payload?.groupId

    const conditions: SQL<unknown>[] = []

    if (!groupId) {
        return c.json(
            { message: 'Group ID is required', data: {}, success: false },
            NOT_FOUND,
        )
    }

    if (query.search) {
        conditions.push(eq(casesTable.name, query.search))
    }

    if (query.search) {
        const searchTerm = `%${query.search}%`
        conditions.push(
            sql`${ilike(casesTable.name, searchTerm)} OR ${ilike(
                casesTable.court,
                searchTerm,
            )}`,
        )
    }

    conditions.push(eq(casesTable.groupId, groupId))

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

    const cases = await db
        .select({
            ...getTableColumns(groupsTable),
        })
        .from(casesTable)
        .where(whereCondition)
        .limit(limit)
        .offset(offset)

    if (cases.length === 0) {
        return c.json(
            { data: {}, message: 'No cases found', success: false },
            NOT_FOUND,
        )
    }

    return c.json({ data: cases, message: 'List of Cases', success: true }, OK)
}
