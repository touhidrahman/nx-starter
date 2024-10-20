import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import env from '../env'
import { AppRouteHandler } from './core.type'

const tags = ['General']

export const healthRoute = createRoute({
    method: 'get',
    path: '/v1',
    tags,
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.object({
                message: z.string(),
                meta: z.object({ port: z.number() }),
            }),
            'Server check',
        ),
    },
})

type HealthRoute = typeof healthRoute

export const healthRouteHandler: AppRouteHandler<HealthRoute> = (c) => {
    return c.json(
        {
            message: 'Server working!',
            meta: { port: env.PORT },
        },
        HttpStatusCodes.OK,
    )
}
