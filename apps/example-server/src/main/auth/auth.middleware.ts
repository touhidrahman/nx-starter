import { jwt } from 'hono/jwt'
import env from '../../env'

export const checkToken = jwt({ secret: env.ACCESS_TOKEN_SECRET })
