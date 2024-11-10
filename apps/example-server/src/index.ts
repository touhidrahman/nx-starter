import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import app from './app'
import env from './env'
import adminSeedRoutes from './main/admin/admin-seed.routes'
import storageRoutes from './main/storage/storage.routes'

app.route('admin/seed', adminSeedRoutes)
app.route('storage', storageRoutes)

if (env.NODE_ENV === 'development' || env.NODE_ENV === 'local') {
    showRoutes(app, {
        verbose: true,
    })
}

console.log(`Server is running on port ${env.PORT}`)

serve({
    fetch: app.fetch,
    port: env.PORT,
})
