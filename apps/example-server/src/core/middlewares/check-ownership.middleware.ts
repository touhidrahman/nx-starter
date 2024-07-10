import { eq } from 'drizzle-orm'
import { Context, Next } from 'hono'
import { db } from '../db/db'

interface TableWithGroupId {
    groupId: number
    id: number
}

const checkOwnershipMiddlewareFactory = <T extends TableWithGroupId>(
    // todo: if i give the table as a generic, it's giving ts error
    table: any,
    // table: SQL<T>,
    tableName: string,
    groupIdColumn = 'groupId',
) => {
    return async (ctx: Context, next: Next) => {
        const payload = await ctx.get('jwtPayload')

        const id = parseInt(ctx.req.param('id'), 10)

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
