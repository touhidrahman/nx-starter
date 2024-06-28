import { Context, Next } from 'hono'

export const isAdmin = async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')
    if (payload.type !== 'admin') {
        return ctx.json({ error: 'Unauthorized' }, 403)
    }

    return next()
}
