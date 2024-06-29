import { serve } from '@hono/node-server'
import 'dotenv/config'
import { Hono } from 'hono'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { showRoutes } from 'hono/dev'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { secureHeaders } from 'hono/secure-headers'
import authRoutes from './main/auth/auth.routes'
import passwordRoutes from './main/password/password.routes'
import userRoutes from './main/user/user.routes'
import groupRoutes from './main/group/group.routes'
import adminGroupRoutes from './main/admin/admin-group.routes'
import adminUserRoutes from './main/admin/admin-user.routes'
import adminSeedRoutes from './main/admin/admin-seed.routes'

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

app.route('auth', authRoutes)
app.route('password', passwordRoutes)
app.route('users', userRoutes)
app.route('groups', groupRoutes)
app.route('admin/seed', adminSeedRoutes)
app.route('admin/users', adminUserRoutes)
app.route('admin/groups', adminGroupRoutes)

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
