import { serve } from '@hono/node-server'
import 'dotenv/config'
import { getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'
import { random } from 'radash'
import { db } from './core/db/db'
import { usersTable } from './core/db/schema'
import authRoutes from './main/auth'

export type Env = {
    NODE_ENV: string
    PORT: number
    DATABASE_URL: string
}

const port = Number.parseInt(process.env.PORT ?? '3000')

const app = new Hono()

app.use(poweredBy())
app.use(logger())

app.get('/', (c) => {
    return c.json({
        message: 'Server working!',
        status: 200,
        meta: { port: port },
    })
})

// app.post('/test', async (c) => {
//     await db.insert(usersTable).values({
//         name: 'John Doe',
//         age: 30,
//         email: `john${random(1, 999)}@doe.com`,
//     })

//     const user = await db.select({...getTableColumns(usersTable)}).from(usersTable)

//     return c.json({ data: user, message: 'User created' })
// })

app.route('v1/auth', authRoutes)

console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
