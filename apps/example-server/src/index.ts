import { serve } from '@hono/node-server'
import 'dotenv/config'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { secureHeaders } from 'hono/secure-headers'
import auth from './main/auth'
import password from './main/password'
import user from './main/user'
import group from './main/group'
import adminGroup from './main/admin-group'

const port = Number.parseInt(process.env.PORT ?? '3000')

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

app.route('auth', auth)
app.route('password', password)
app.route('users', user)
app.route('groups', group)
// app.route('admin/users', adminUser)
app.route('admin/groups', adminGroup)

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
