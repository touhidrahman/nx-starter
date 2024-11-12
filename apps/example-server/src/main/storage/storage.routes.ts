import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { storageTable } from '../../core/db/schema'
import { s3Client, S3fileUrl } from '../../utils/s3Config'
import { PutObjectCommand } from '@aws-sdk/client-s3'

import {
    InsertStorage,
    SelectStorage,
    zDeleteStorage,
    zInsertStorage,
    zUpdateStorage,
} from './storage.schema'
import { uploadFile } from '../file-upload/file-upload.service'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

app.post('upload', async (c) => {
    const body = await c.req.parseBody()
    const payload = c.get('jwtPayload')
    const file: string | File = body['file'] as File // File | string

    const url = await uploadFile(file)
    const entityId = body.entity_id as string
    const entityName = body.entity_name as string
    const data = {
        filename: file.name,
        url,
        extension: file.type,
        uploadedBy: 'murad',
        entityId,
        entityName,
    }

    const storage = await db.insert(storageTable).values(data).returning()
    return c.json({ data: storage }, 201)
    //console.log(payload)
})

// GET /storage - list all
app.get('', async (c) => {
    const storage = await db
        .select({ ...getTableColumns(storageTable) })
        .from(storageTable)
        .limit(100)

    if (storage) c.json({ data: {}, message: 'No file found' })

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
