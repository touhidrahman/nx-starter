import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import app from './app'
import env from './env'
import adminSeedRoutes from './main/admin/admin-seed.routes'
import messagesRoutes from './main/messages/messages.routes'
import permissionsRoutes from './main/permissions/permissions.routes'
import storageRoutes from './main/storage/storage.routes'
import subscriptionRoutes from './main/subscription/subscription.routes'

app.route('admin/seed', adminSeedRoutes)
app.route('messages', messagesRoutes)
app.route('permissions', permissionsRoutes)
app.route('storage', storageRoutes)
app.route('subscriptions', subscriptionRoutes)
app.route('subscription', subscriptionRoutes)

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
