import { eq } from 'drizzle-orm'
import { Context, Next } from 'hono'
import { db } from '../db/db'

interface TableWithGroupId {
    groupId: number
    id: number
}

const checkOwnershipMiddlewareFactory = <T extends TableWithGroupId>(
    table: any,
    tableName: string,
    groupIdColumn = 'groupId',
) => {
    return async (ctx: Context, next: Next) => {
        const payload = await ctx.get('jwtPayload')
        if (!payload) {
            return ctx.json(
                { error: 'Unauthorized', message: 'Not authenticated' },
                403,
            )
        }

        const id = parseInt(ctx.req.param('id'), 10)
        if (isNaN(id)) {
            return ctx.json(
                {
                    error: 'Invalid ID',
                    message: `${tableName} ID must be a number`,
                },
                400,
            )
        }

        const item = await db
            .select()
            .from(table)
            .where(eq(table.id, id))
            .limit(1)

        if (item.length === 0) {
            return ctx.json(
                { error: 'Not found', message: `${tableName} not found` },
                404,
            )
        }

        if (item[0][groupIdColumn] !== payload.groupId) {
            return ctx.json(
                { error: 'Unauthorized', message: 'Access denied' },
                403,
            )
        }

        ctx.set(`${tableName}Item`, item[0])
        await next()
    }
}

export default checkOwnershipMiddlewareFactory
