import { getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../core/db/db'
import { usersTable } from '../../core/db/schema'

const app = new Hono().basePath('admin')

app.get('/', async (c) => {
    const users = await db
        .select({ ...getTableColumns(usersTable) })
        .from(usersTable)

    return c.json({ data: users, message: 'List of Users' })
})

export default app
