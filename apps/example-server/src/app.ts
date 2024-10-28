import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { generalRoutes } from './core/general.routes'
import { applicationAreasV1Routes } from './main/application-areas/application-areas.routes'
import { appointmentsV1Routes } from './main/appointments/appointments.routes'
import { authV1Routes } from './main/auth/auth.routes'
import { userV1Routes } from './main/user/user.routes'

const app = createApp()

const routes = [generalRoutes, applicationAreasV1Routes, appointmentsV1Routes, authV1Routes, userV1Routes, ]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
