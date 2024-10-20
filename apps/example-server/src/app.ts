import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { generalRoutes } from './core/general.routes'
import { authV1Routes } from './main/auth/auth.routes'

const app = createApp()

const routes = [generalRoutes, authV1Routes]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
