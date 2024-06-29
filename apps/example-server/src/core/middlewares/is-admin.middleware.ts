import { Context, Next } from 'hono'

export const isAdmin = async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')
    if (payload.type !== 'admin') {
        return ctx.json({ error: 'Unauthorized', message: 'Not an admin' }, 403)
    }

    return next()
}

export const is =
    (type: 'admin' | 'moderator' | 'user') =>
    async (ctx: Context, next: Next) => {
        const payload = ctx.get('jwtPayload')
        if (payload.type !== type) {
            return ctx.json({ error: 'Unauthorized' }, 403)
        }

        return next()
    }
