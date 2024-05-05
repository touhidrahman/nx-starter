import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Hono!')
})
app.get('/api', (c) => {
    return c.json({ message: 'Hello Hono!' })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
