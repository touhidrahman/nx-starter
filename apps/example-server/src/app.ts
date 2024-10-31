import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { generalRoutes } from './core/general.routes'
import { authV1Routes } from './main/auth/auth.routes'
import { groupsV1Route } from './main/group/group.routes'
import { userV1Routes } from './main/user/user.routes'

const app = createApp()

const routes = [generalRoutes, authV1Routes, userV1Routes, groupsV1Route]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
