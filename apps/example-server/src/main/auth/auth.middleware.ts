import { jwt } from 'hono/jwt'

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

if (!secret) {
    throw new Error('ACCESS_TOKEN_SECRET env variable is required')
}

export const checkToken = jwt({ secret })
