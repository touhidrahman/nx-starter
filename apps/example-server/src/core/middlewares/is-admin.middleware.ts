import { Context, Next } from 'hono'
import {
    LEVEL_ADMIN,
    LEVEL_MODERATOR,
    LEVEL_USER,
} from '../../main/user/user.schema'

export const isAdmin = async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')
    if (payload.level !== LEVEL_ADMIN) {
        return ctx.json({ error: 'Unauthorized', message: 'Not an admin' }, 403)
    }

    return next()
}

export const isLevel =
    (type: typeof LEVEL_ADMIN | typeof LEVEL_MODERATOR | typeof LEVEL_USER) =>
    async (ctx: Context, next: Next) => {
        const payload = ctx.get('jwtPayload')
        if (payload.type !== type) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        return next()
    }
