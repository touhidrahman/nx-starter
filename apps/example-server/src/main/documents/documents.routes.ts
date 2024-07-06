import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { documentsTable } from '../../core/db/schema'
import {
    zDeleteDocument,
    zInsertDocument,
    zUpdateDocument,
} from './documents.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /documents - list all
app.get('/documents', authMiddleware, async (c) => {
    const documents = await db
        .select({ ...getTableColumns(documentsTable) })
        .from(documentsTable)
        .limit(100)

    return c.json({ data: documents, message: 'Documents list' })
})

// GET /documents/:id - find one
app.get('/documents/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const document = await db
        .select({ ...getTableColumns(documentsTable) })
        .from(documentsTable)
        .where(eq(documentsTable.id, id))
        .limit(1)

    if (document.length === 0) {
        return c.json({ message: 'Document not found' }, 404)
    }

    return c.json({ data: document[0], message: 'Document found' })
})

// POST /documents - create one
app.post(
    '/documents',
    zValidator('json', zInsertDocument),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newDocument = await db
            .insert(documentsTable)
            .values(body)
            .returning()

        return c.json({ data: newDocument, message: 'Document created' })
    },
)

// PATCH /documents/:id - update
app.patch(
    '/documents/:id',
    zValidator('json', zUpdateDocument),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedDocument = await db
            .update(documentsTable)
            .set(body)
            .where(eq(documentsTable.id, id))
            .returning()

        return c.json({ data: updatedDocument, message: 'Document updated' })
    },
)

// DELETE /documents/:id - delete
app.delete('/documents/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(documentsTable).where(eq(documentsTable.id, id))

    return c.json({ message: 'Document deleted' })
})

// DELETE /documents - delete many
app.delete(
    '/documents',
    zValidator('json', zDeleteDocument),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const documentId of body.documentIds) {
            await db
                .delete(documentsTable)
                .where(eq(documentsTable.id, documentId))
        }

        return c.json({ message: 'Documents deleted' })
    },
)

export default app
