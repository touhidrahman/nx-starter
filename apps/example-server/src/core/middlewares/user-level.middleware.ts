import { Context, Next } from "hono";

export const checkLevel = (allowedLevels: string[]) => async (ctx: Context, next: Next) => {
    const payload = ctx.get('jwtPayload')

    if (!allowedLevels.includes(payload.level)) {
        return ctx.json({ message: 'Forbidden: Insufficient permissions' }, 403);
    }
    await next();
};