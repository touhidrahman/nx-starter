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
    zInsertDocument,
    zUpdateDocument,
    zUploadDocument,
} from './documents.schema'
import { zId, zIds } from '../../core/models/common.schema'
import {
    buildS3Url,
    uploadToS3AndGetUrl,
} from '../../core/third-party/s3.service'
import { BAD_REQUEST, CREATED } from 'stoker/http-status-codes'

const app = new Hono()

// GET /documents - list all
app.get('v1/documents', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
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
    'v1/documents/:id',
    authMiddleware,
    zValidator('param', zId),
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
app.post(
    'v1/documents',
    zValidator('form', zUploadDocument),
    authMiddleware,
    async (c) => {
        const { file, files, entityId, entityName } = c.req.valid('form')
        const { groupId, userId } = await c.get('jwtPayload')
        const payload = await c.get('jwtPayload')
        console.log('TCL: | userId:', payload)

        const items: { file: File; key: string }[] = []
        if (file) {
            // Handle single file upload
            const key = await uploadToS3AndGetUrl(file)
            items.push({ file, key })
        }

        if (files?.length) {
            // Handle multiple file uploads
            const uploadedFiles = await Promise.all(
                files.map((file) => uploadToS3AndGetUrl(file)),
            )
            for (let i = 0; i < uploadedFiles.length; i++) {
                items.push({ file: files[i], key: uploadedFiles[i] })
            }
        }

        const newDocuments = await db
            .insert(documentsTable)
            .values(
                items.map((item) => ({
                    filename: item.key,
                    mimetype: item.file.type,
                    size: item.file.size,
                    entityId,
                    entityName,
                    url: buildS3Url(item.key),
                    userId,
                    groupId,
                })),
            )
            .returning()
        return c.json(
            { data: newDocuments, message: 'Documents created' },
            CREATED,
        )
    },
)

// PATCH /documents/:id - update
app.patch(
    'v1/documents/:id',
    zValidator('param', zId),
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
    'v1/documents/:id',
    zValidator('param', zId),
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
    'v1/documents',
    zValidator('json', zIds),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        try {
            for (const documentId of body.ids) {
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
