import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { db } from '../../core/db/db'
import { documentSharingTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import {
    zDeleteDocumentSharing,
    zInsertDocumentSharing,
    zUpdateDocumentSharing,
} from './documents-sharing.schema'

const app = new Hono()

// GET /documentSharing - list all
app.get('', authMiddleware, async (c) => {
    const documentSharings = await db
        .select({ ...getTableColumns(documentSharingTable) })
        .from(documentSharingTable)
        .limit(100)

    return c.json({ data: documentSharings, message: 'Document Sharing list' })
})

// GET /documentSharing/:id - find one
app.get('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')
    const documentSharing = await db
        .select({ ...getTableColumns(documentSharingTable) })
        .from(documentSharingTable)
        .where(eq(documentSharingTable.id, id))
        .limit(1)

    if (documentSharing.length === 0) {
        return c.json({ message: 'Document Sharing not found' }, 404)
    }

    return c.json({
        data: documentSharing[0],
        message: 'Document Sharing found',
    })
})

// POST /documentSharing - create one
app.post(
    '',
    zValidator('json', zInsertDocumentSharing),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newDocumentSharing = await db
            .insert(documentSharingTable)
            .values(body)
            .returning()

        return c.json({
            data: newDocumentSharing,
            message: 'Document Sharing created',
        })
    },
)

// PATCH /documentSharing/:id - update
app.patch(
    '/:id',
    zValidator('json', zUpdateDocumentSharing),
    authMiddleware,
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')

        const updatedDocumentSharing = await db
            .update(documentSharingTable)
            .set(body)
            .where(eq(documentSharingTable.id, id))
            .returning()

        return c.json({
            data: updatedDocumentSharing,
            message: 'Document Sharing updated',
        })
    },
)

// DELETE /documentSharing/:id - delete
app.delete('/:id', authMiddleware, async (c) => {
    const id = c.req.param('id')

    await db.delete(documentSharingTable).where(eq(documentSharingTable.id, id))

    return c.json({ message: 'Document Sharing deleted' })
})

// DELETE /documentSharing - delete many
app.delete(
    '',
    zValidator('json', zDeleteDocumentSharing),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const documentSharingId of body.documentSharingIds) {
            await db
                .delete(documentSharingTable)
                .where(eq(documentSharingTable.id, documentSharingId))
        }

        return c.json({ message: 'Document Sharings deleted' })
    },
)

export default app
