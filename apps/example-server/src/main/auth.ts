import { Hono } from 'hono'

const app = new Hono()

app.post('/login', (c) => c.json({ message: 'Login successful' }))
app.post('/register', (c) => c.json({ message: 'Account created' }, 201))
app.get('/verify-email/:token', (c) => c.json(`get ${c.req.param('token')}`))
app.post('/forgot-password', (c) => c.json(`post forgot password}`))

app.post('/reset-password/:token', (c) =>
    c.json(`post ${c.req.param('token')}`),
)

export default app
