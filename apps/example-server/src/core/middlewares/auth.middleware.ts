import { jwt } from 'hono/jwt'

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

export const authMiddleware = jwt({ secret })
