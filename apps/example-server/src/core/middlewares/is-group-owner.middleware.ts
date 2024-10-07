import { Context, Next } from 'hono'
import { isOwner } from '../../main/group/group.service'
import { ROLE_OWNER } from '../../main/user/user.schema'

export const isGroupOwner = async (ctx: Context, next: Next) => {
    const payload = await ctx.get('jwtPayload')
    if (!payload?.groupId || payload.role !== ROLE_OWNER)
        return ctx.json(
            { error: 'Unauthorized', message: 'Not a group owner' },
            403,
        )

    const id = ctx.req.param('id')

    const exists = await isOwner(payload.userId, id)

    if (!exists) {
        return ctx.json(
            { error: 'Unauthorized', message: 'Not a group owner' },
            403,
        )
    }

    return next()
}
