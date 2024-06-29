import { getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../core/db/db'
import { usersTable } from '../../core/db/schema'
import { zRegister } from '../auth/auth.schema'
import { zValidator } from '@hono/zod-validator'

const app = new Hono().basePath('admin')

app.get('/', async (c) => {
    const users = await db
        .select({ ...getTableColumns(usersTable) })
        .from(usersTable)

    return c.json({ data: users, message: 'List of Users' })
})

app.put('/:id/make-admin', async (c) => {
    return c.json({ data: '', message: 'User updated' })
})

export default app
