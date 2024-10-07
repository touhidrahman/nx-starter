import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { toInt } from 'radash'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { documentsTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkDocumentOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import {
    zDeleteDocument,
    zInsertDocument,
    zUpdateDocument,
} from './documents.schema'

const app = new Hono()

// GET /documents - list all
app.get('', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = toInt(payload.groupId)
        const documents = await db
            .select({ ...getTableColumns(documentsTable) })
            .from(documentsTable)
            .where(eq(documentsTable.groupId, groupId))
            .limit(100)

        return c.json({ data: documents, message: 'Documents list' })
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }
})

// GET /documents/:id - find one
app.get(
    '/:id',
    authMiddleware,
    zValidator('param', z.object({ id: z.coerce.number() })),
    checkDocumentOwnershipMiddleware(documentsTable, 'Document'),
    async (c) => {
        const id = c.req.param('id')
        const document = await db
            .select({ ...getTableColumns(documentsTable) })
            .from(documentsTable)
            .where(eq(documentsTable.id, id))
            .limit(1)

        if (document.length === 0) {
            return c.json({ message: 'Document not found' }, 404)
        }

        return c.json({ data: document[0], message: 'Document found' })
    },
)

// POST /documents - create one
app.post('', zValidator('json', zInsertDocument), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newDocument = await db.insert(documentsTable).values(body).returning()

    return c.json({ data: newDocument, message: 'Document created' })
})

// PATCH /documents/:id - update
app.patch(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator('json', zUpdateDocument),
    authMiddleware,
    checkDocumentOwnershipMiddleware(documentsTable, 'Document'),
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedDocument = await db
            .update(documentsTable)
            .set(body)
            .where(
                and(
                    eq(documentsTable.id, id),
                    eq(documentsTable.groupId, payload.groupId),
                ),
            )
            .returning()

        return c.json({ data: updatedDocument, message: 'Document updated' })
    },
)

// DELETE /documents/:id - delete
app.delete(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    authMiddleware,
    checkDocumentOwnershipMiddleware(documentsTable, 'Document'),
    async (c) => {
        const id = c.req.param('id')

        await db.delete(documentsTable).where(eq(documentsTable.id, id))

        return c.json({ message: 'Document deleted' })
    },
)

// DELETE /documents - delete many
app.delete(
    '',
    zValidator('json', zDeleteDocument),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        try {
            for (const documentId of body.documentIds) {
                await db
                    .delete(documentsTable)
                    .where(
                        and(
                            eq(documentsTable.id, documentId),
                            eq(documentsTable.groupId, payload.groupId),
                        ),
                    )
            }

            return c.json({ message: 'Documents deleted' })
        } catch (error: any) {
            return c.json(
                { error: 'Internal server error', message: error.message },
                500,
            )
        }
    },
)

export default app
