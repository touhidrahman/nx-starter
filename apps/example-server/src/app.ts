import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { appV1Routes } from './routes'

const app = createApp()

const routes = [appV1Routes]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
