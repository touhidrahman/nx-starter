import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from './core/create-app'
import env from './env'

export const healthRoute = createRouter().openapi(
    createRoute({
        method: 'get',
        path: '/',
        responses: {
            200: {
                description: 'Server check',
                content: {
                    'application/json': {
                        schema: z.object({
                            message: z.string(),
                            meta: z.object({ port: z.number() }),
                        }),
                    },
                },
            },
        },
    }),
    (c) => {
        return c.json(
            {
                message: 'Server working!',
                meta: { port: env.PORT },
            },
            200,
        )
    },
)
