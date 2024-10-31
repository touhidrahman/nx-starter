import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import app from './app'
import env from './env'
import adminSeedRoutes from './main/admin/admin-seed.routes'
import documentsSharingRoutes from './main/documents-sharing/documents-sharing.routes'
import documentsRoutes from './main/documents/documents.routes'
import eventsRoutes from './main/events/events.routes'
import groupRoutes from './main/group/group.routes'
import messagesRoutes from './main/messages/messages.routes'
import permissionsRoutes from './main/permissions/permissions.routes'
import storageRoutes from './main/storage/storage.routes'
import subscriptionRoutes from './main/subscription/subscription.routes'
import tasksRoutes from './main/tasks/tasks.routes'

app.route('admin/seed', adminSeedRoutes)
app.route('documents', documentsRoutes)
app.route('document-sharing', documentsSharingRoutes)
app.route('events', eventsRoutes)
app.route('groups', groupRoutes)
app.route('messages', messagesRoutes)
app.route('permissions', permissionsRoutes)
app.route('storage', storageRoutes)
app.route('subscriptions', subscriptionRoutes)
app.route('subscription', subscriptionRoutes)
app.route('tasks', tasksRoutes)

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
