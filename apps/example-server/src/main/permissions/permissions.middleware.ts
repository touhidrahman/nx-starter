import { Context, Next } from 'hono'
import { permissionsTable } from '../../core/db/schema'
import { and, eq } from 'drizzle-orm'
import { db } from '../../core/db/db'

function hasPermission(area: string, requiredLevel: 1 | 2 | 3 | 4) {
    return async (ctx: Context, next: Next) => {
        const payload = await ctx.get('jwtPayload')
        if (!payload) return ctx.json({ error: 'Unauthorized' }, 403)

        // check in permissions table
        const record = await db
            .select()
            .from(permissionsTable)
            .where(
                and(
                    eq(permissionsTable.role, payload?.role),
                    eq(permissionsTable.area, area),
                ),
            )
            .limit(1)

        if (record.length === 0) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        if (record[0].access < requiredLevel) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        return next()
    }
}
