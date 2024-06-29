import { and, eq } from 'drizzle-orm'
import { Context, Next } from 'hono'
import { toInt } from 'radash'
import { db } from '../db/db'
import { groupToUsersTable } from '../db/schema'

export const isGroupOwner = async (ctx: Context, next: Next) => {
    const payload = await ctx.get('jwtPayload')
    if (!payload)
        return ctx.json(
            { error: 'Unauthorized', message: 'Not a group owner' },
            403,
        )

    const id = toInt(ctx.req.param('id'))

    const record = await db
        .select()
        .from(groupToUsersTable)
        .where(
            and(
                eq(groupToUsersTable.groupId, id),
                eq(groupToUsersTable.userId, payload?.sub),
                eq(groupToUsersTable.isOwner, true),
            ),
        )
        .limit(1)

    if (record.length === 0) {
        return ctx.json(
            { error: 'Unauthorized', message: 'Not a group owner' },
            403,
        )
    }

    return next()
}
