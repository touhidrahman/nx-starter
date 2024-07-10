import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { storageTable } from '../../core/db/schema'
import {
    zDeleteStorage,
    zInsertStorage,
    zUpdateStorage,
} from './storage.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /storage - list all
app.get('', authMiddleware, async (c) => {
    const storage = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .limit(100)

    return c.json({ data: storage, message: 'Storage list' })
})

// GET /storage/:id - find one
app.get('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const storage = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .where(eq(storageTable.id, id))
        .limit(1)

    if (storage.length === 0) {
        return c.json({ message: 'Storage not found' }, 404)
    }

    return c.json({ data: storage[0], message: 'Storage found' })
})

// POST /storage - create one
app.post('', zValidator('json', zInsertStorage), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newStorage = await db.insert(storageTable).values(body).returning()

    return c.json({ data: newStorage, message: 'Storage created' })
})

// PATCH /storage/:id - update
app.patch(
    '/:id',
    zValidator('json', zUpdateStorage),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedStorage = await db
            .update(storageTable)
            .set(body)
            .where(eq(storageTable.id, id))
            .returning()

        return c.json({ data: updatedStorage, message: 'Storage updated' })
    },
)

// DELETE /storage/:id - delete
app.delete('/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(storageTable).where(eq(storageTable.id, id))

    return c.json({ message: 'Storage deleted' })
})

// DELETE /storage - delete many
app.delete(
    '',
    zValidator('json', zDeleteStorage),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const storageId of body.storageIds) {
            await db.delete(storageTable).where(eq(storageTable.id, storageId))
        }

        return c.json({ message: 'Storage entries deleted' })
    },
)

export default app
