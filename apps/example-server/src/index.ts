import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import app from './app'
import env from './env'

const logRoutesToConsole = false
if (env.NODE_ENV !== 'production' && logRoutesToConsole) {
    showRoutes(app, {
        verbose: true,
    })
}

console.log(`Server is running on port ${env.PORT}`)

serve({
    fetch: app.fetch,
    port: env.PORT,
})
