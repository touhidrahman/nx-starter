import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from './core/create-app'
import env from './env'
import { jsonContent } from 'stoker/openapi/helpers'
import * as HttpStatusCodes from 'stoker/http-status-codes'

export const healthRoute = createRouter().openapi(
    createRoute({
        method: 'get',
        path: '/',
        responses: {
            [HttpStatusCodes.OK]: jsonContent(
                z.object({
                    message: z.string(),
                    meta: z.object({ port: z.number() }),
                }),
                'Server check',
            ),
        },
    }),
    (c) => {
        return c.json(
            {
                message: 'Server working!',
                meta: { port: env.PORT },
            },
            HttpStatusCodes.OK,
        )
    },
)
