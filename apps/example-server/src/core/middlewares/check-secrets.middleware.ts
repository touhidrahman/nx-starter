import { createFactory } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

const factory = createFactory()

export const checkSecretsMiddleware = factory.createMiddleware(
    async (c, next) => {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
        if (!accessTokenSecret || !refreshTokenSecret) {
            console.error('Missing secrets')
            throw new HTTPException(500, { message: 'Internal server error' })
        }
        await next()
    },
)
