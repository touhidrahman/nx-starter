import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError } from 'stoker/middlewares'
import { pinoLogger } from './core/middlewares/pino-logger.middleware'
import { PinoLogger } from 'hono-pino'

type AppBindings = {
    Variables: {
        logger: PinoLogger
    }
}

const port = Number.parseInt(process.env.PORT ?? '3000')

const app = new OpenAPIHono<AppBindings>().basePath('v1')

app.use(pinoLogger())

app.get('/', (c) => {
    return c.json({
        message: 'Server working!',
        status: 200,
        meta: { port: port },
    })
})

app.notFound(notFound)
app.onError(onError)

export default app
