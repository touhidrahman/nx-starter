import configureOpenAPI from './core/configure-open-api'
import createApp from './core/create-app'
import { healthRoute } from './routes'

const app = createApp()

const routes = [healthRoute]

configureOpenAPI(app)

for (const route of routes) {
    app.route('/', route)
}

export default app
