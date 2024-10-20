import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from './core/create-app'
import env from './env'
import { jsonContent } from 'stoker/openapi/helpers'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { healthRoute, healthRouteHandler } from './core/health.routes'
import { loginHandler, loginRoute } from './main/auth/login.routes'

export const appV1Routes = createRouter()
    .openapi(healthRoute, healthRouteHandler)
    .openapi(loginRoute, loginHandler)
