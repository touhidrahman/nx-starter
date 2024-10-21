import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import env from '../env'
import { AppRouteHandler } from './core.type'
import { createRouter } from './create-app'
import { ApiResponse } from './utils/api-response.util'

const tags = ['General']

export const healthRoute = createRoute({
    method: 'get',
    path: '/v1',
    tags,
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(
            z.object({ port: z.number() }),
            'Server running',
        ),
    },
})

type HealthRoute = typeof healthRoute

export const healthRouteHandler: AppRouteHandler<HealthRoute> = (c) => {
    return c.json(
        {
            message: 'Server working!',
            data: { port: env.PORT },
        },
        HttpStatusCodes.OK,
    )
}

export const generalRoutes = createRouter().openapi(
    healthRoute,
    healthRouteHandler,
)
