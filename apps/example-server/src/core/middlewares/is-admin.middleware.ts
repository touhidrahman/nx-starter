import { Context, Next } from 'hono'
import {
    USER_LEVEL_ADMIN,
    USER_LEVEL_MODERATOR,
    USER_LEVEL_USER,
} from '../../main/user/user.schema'

export const isAdmin = async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')
    if (payload.level !== USER_LEVEL_ADMIN) {
        return ctx.json({ error: 'Unauthorized', message: 'Not an admin' }, 403)
    }

    return next()
}

export const isLevel =
    (
        type:
            | typeof USER_LEVEL_ADMIN
            | typeof USER_LEVEL_MODERATOR
            | typeof USER_LEVEL_USER,
    ) =>
    async (ctx: Context, next: Next) => {
        const payload = ctx.get('jwtPayload')
        if (payload.type !== type) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        return next()
    }
