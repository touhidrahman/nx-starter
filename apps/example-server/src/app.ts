import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { generalRoutes } from './core/general.routes'
import { authV1Routes } from './main/auth/auth.routes'
import { userV1Routes } from './main/user/user.routes'
import uploadRoutes from './main/upload/upload.routes'
import adminGroupRoutes from './main/admin/admin-group.routes'
import adminSeedRoutes from './main/admin/admin-seed.routes'
import adminUserRoutes from './main/admin/admin-user.routes'
import applicationAreasRoutes from './main/application-areas/application-areas.routes'
import appointmentsRoutes from './main/appointments/appointments.routes'
import caseRoutes from './main/case/case.routes'
import courtsRoutes from './main/courts/courts.routes'
import documentsSharingRoutes from './main/documents-sharing/documents-sharing.routes'
import documentsRoutes from './main/documents/documents.routes'
import eventsRoutes from './main/events/events.routes'
import groupRoutes from './main/group/group.routes'
import messagesRoutes from './main/messages/messages.routes'
import permissionsRoutes from './main/permissions/permissions.routes'
import subscriptionRoutes from './main/subscription/subscription.routes'
import tasksRoutes from './main/tasks/tasks.routes'

const app = createApp()

const routes = [generalRoutes, authV1Routes, userV1Routes]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

app.route('/', uploadRoutes)

app.route('admin/seed', adminSeedRoutes)
app.route('admin/users', adminUserRoutes)
app.route('admin/groups', adminGroupRoutes)
app.route('application-areas', applicationAreasRoutes)
app.route('appointments', appointmentsRoutes)
app.route('cases', caseRoutes)
app.route('courts', courtsRoutes)
app.route('documents', documentsRoutes)
app.route('document-sharing', documentsSharingRoutes)
app.route('events', eventsRoutes)
app.route('groups', groupRoutes)
app.route('messages', messagesRoutes)
app.route('permissions', permissionsRoutes)
app.route('subscriptions', subscriptionRoutes)
app.route('subscription', subscriptionRoutes)
app.route('tasks', tasksRoutes)

export default app
