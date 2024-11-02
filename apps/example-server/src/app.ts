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
import { eventV1Route } from './main/events/events.routes'
import { groupsV1Route } from './main/group/group.routes'
import { userV1Routes } from './main/user/user.routes'

const app = createApp()

const routes = [
    generalRoutes,
    adminGroupV1Routes,
    adminUserV1Routes,
    applicationAreasV1Routes,
    appointmentsV1Routes,
    authV1Routes,
    caseV1Routes,
    courtsV1Routes,
    userV1Routes,
    groupsV1Route,
    eventV1Route,
]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
