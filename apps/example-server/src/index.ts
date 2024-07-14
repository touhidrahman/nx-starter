import { serve } from '@hono/node-server'
import 'dotenv/config'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { secureHeaders } from 'hono/secure-headers'
import adminGroupRoutes from './main/admin/admin-group.routes'
import adminSeedRoutes from './main/admin/admin-seed.routes'
import adminUserRoutes from './main/admin/admin-user.routes'
import applicationAreasRoutes from './main/application-areas/application-areas.routes'
import appointmentsRoutes from './main/appointments/appointments.routes'
import authRoutes from './main/auth/auth.routes'
import caseRoutes from './main/case/case.routes'
import courtsRoutes from './main/courts/courts.routes'
import documentsSharingRoutes from './main/documents-sharing/documents-sharing.routes'
import documentsRoutes from './main/documents/documents.routes'
import eventsRoutes from './main/events/events.routes'
import groupRoutes from './main/group/group.routes'
import messagesRoutes from './main/messages/messages.routes'
import passwordRoutes from './main/password/password.routes'
import permissionsRoutes from './main/permissions/permissions.routes'
import profileRoutes from './main/profile/profile.routes'
import storageRoutes from './main/storage/storage.routes'
import subscriptionRoutes from './main/subscription/subscription.routes'
import tasksRoutes from './main/tasks/tasks.routes'
import userRoutes from './main/user/user.routes'

const port = Number.parseInt(process.env.PORT ?? '3000')
const nodeEnv = process.env.NODE_ENV ?? 'development'

const app = new Hono().basePath('v1')

app.use(poweredBy())
app.use(logger())
app.use(secureHeaders())

app.use(cors())
app.use(compress())

app.get('/', (c) => {
    return c.json({
        message: 'Server working!',
        status: 200,
        meta: { port: port },
    })
})
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

app.route('admin/seed', adminSeedRoutes)
app.route('admin/users', adminUserRoutes)
app.route('admin/groups', adminGroupRoutes)
app.route('application-areas', applicationAreasRoutes)
app.route('appointments', appointmentsRoutes)
app.route('auth', authRoutes)
app.route('cases', caseRoutes)
app.route('courts', courtsRoutes)
app.route('documents', documentsRoutes)
app.route('document-sharing', documentsSharingRoutes)
app.route('events', eventsRoutes)
app.route('groups', groupRoutes)
app.route('messages', messagesRoutes)
app.route('password', passwordRoutes)
app.route('profile', profileRoutes)
app.route('permissions', permissionsRoutes)
app.route('storage', storageRoutes)
app.route('subscriptions', subscriptionRoutes)
app.route('subscription', subscriptionRoutes)
app.route('tasks', tasksRoutes)
app.route('users', userRoutes)

if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'local'
) {
    showRoutes(app, {
        verbose: true,
    })
}

console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
