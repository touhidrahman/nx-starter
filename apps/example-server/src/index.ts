import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import authRoutes from './main/auth'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Server working!')
})

app.route('v1/auth', authRoutes)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
