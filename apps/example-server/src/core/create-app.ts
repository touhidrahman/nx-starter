import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'
import { AppBindings } from './core.type'
import { pinoLogger } from './middlewares/pino-logger.middleware'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { poweredBy } from 'hono/powered-by'
import { secureHeaders } from 'hono/secure-headers'

export function createRouter() {
    return new OpenAPIHono<AppBindings>({ strict: false })
}

export default function createApp() {
    const app = createRouter()

    app.use(serveEmojiFavicon('🚀'))
    app.use(pinoLogger())
    app.use(poweredBy())
    app.use(secureHeaders())
    app.use(cors())
    app.use(compress())
    app.notFound(notFound)
    app.onError(onError)

    return app
}
