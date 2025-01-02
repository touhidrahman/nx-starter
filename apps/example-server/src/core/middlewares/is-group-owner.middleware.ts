import { Context, Next } from 'hono'
import { isOwner, isParticipant } from '../../main/group/group.service'
import { USER_ROLE_ADMIN } from '../../main/user/user.schema'

export const isGroupOwner = async (ctx: Context, next: Next) => {
    const payload = await ctx.get('jwtPayload')
    if (!payload?.groupId || payload.role !== USER_ROLE_ADMIN)
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

export const isGroupParticipant = async (ctx: Context, next: Next) => {
    const payload = await ctx.get('jwtPayload')
    if (!payload?.groupId || !payload.userId)
        return ctx.json(
            { error: 'Unauthorized', message: 'Not a group participant' },
            403,
        )

    const id = ctx.req.param('id')

    const exists = await isParticipant(payload.userId, id)

    if (!exists) {
        return ctx.json(
            { error: 'Unauthorized', message: 'Not a group owner' },
            403,
        )
    }

    return next()
}
