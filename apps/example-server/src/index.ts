import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import authRoutes from './main/auth'

export type Env = {
    NODE_ENV: string
    PORT: number
    DATABASE_URL: string
}

const port = Number.parseInt(process.env.PORT ?? '3000')

const app = new Hono()

app.get('/', (c) => {
    return c.json({
        message: 'Server working!',
        status: 200,
        meta: { port: port },
    })
})

app.route('v1/auth', authRoutes)

console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
