import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { seed } from '../../core/db/seed'
import { isAdmin } from '../../core/middlewares/is-admin.middleware'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

app.get(
    '/',
    /* jwt({ secret }), isAdmin, */ async (c) => {
        if (process.env.NODE_ENV !== 'development') {
            return c.json({ message: 'Not allowed' }, 403)
        }
        await seed()
        return c.json({ message: 'Database seeded' })
    },
)

export default app
