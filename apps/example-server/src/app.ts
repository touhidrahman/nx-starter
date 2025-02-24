import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { generalRoutes } from './core/general.routes'
import { adminGroupV1Routes } from './main/admin/admin-group.routes'
import { adminUserV1Routes } from './main/admin/admin-user.routes'
import { applicationAreasV1Routes } from './main/application-areas/application-areas.routes'
import { appointmentsV1Routes } from './main/appointments/appointments.routes'
import { authV1Routes } from './main/auth/auth.routes'
import { caseV1Routes } from './main/case/case.routes'
import { courtsV1Routes } from './main/courts/courts.routes'
import { documentSharingV1Route } from './main/documents-sharing/documents-sharing.routes'
import { documentV1Route } from './main/documents/documents.routes'
import { eventV1Route } from './main/events/events.routes'
import { groupsV1Route } from './main/group/group.routes'
import { lawyerV1Routes } from './main/lawyer/lawyer.routes'
import { messagesV1Route } from './main/messages/messages.routes'
import { permissionsV1Route } from './main/permissions/permissions.routes'
import { planV1Routes } from './main/plan/plan.routes'
import { storageV1Routes } from './main/storage/storage.routes'
import { subscriptionV1Route } from './main/subscription/subscription.routes'
import { taskV1Route } from './main/tasks/tasks.routes'
import { userV1Routes } from './main/user/user.routes'
import { invitesV1Route } from './main/invite/invites.routes'

const app = createApp()

const routes = [
    adminGroupV1Routes,
    adminUserV1Routes,
    applicationAreasV1Routes,
    appointmentsV1Routes,
    authV1Routes,
    caseV1Routes,
    courtsV1Routes,
    documentSharingV1Route,
    documentV1Route,
    eventV1Route,
    generalRoutes,
    groupsV1Route,
    lawyerV1Routes,
    messagesV1Route,
    permissionsV1Route,
    planV1Routes,
    storageV1Routes,
    subscriptionV1Route,
    taskV1Route,
    userV1Routes,
    invitesV1Route,
]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
