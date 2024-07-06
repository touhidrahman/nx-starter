import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { messagesTable } from '../../core/db/schema'
import {
    zDeleteMessage,
    zInsertMessage,
    zUpdateMessage,
} from './messages.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /messages - list all
app.get('/messages', authMiddleware, async (c) => {
    const messages = await db
        .select({ ...getTableColumns(messagesTable) })
        .from(messagesTable)
        .limit(100)

    return c.json({ data: messages, message: 'Messages list' })
})

// GET /messages/:id - find one
app.get('/messages/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const message = await db
        .select({ ...getTableColumns(messagesTable) })
        .from(messagesTable)
        .where(eq(messagesTable.id, id))
        .limit(1)

    if (message.length === 0) {
        return c.json({ message: 'Message not found' }, 404)
    }

    return c.json({ data: message[0], message: 'Message found' })
})

// POST /messages - create one
app.post(
    '/messages',
    zValidator('json', zInsertMessage),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newMessage = await db
            .insert(messagesTable)
            .values(body)
            .returning()

        return c.json({ data: newMessage, message: 'Message created' })
    },
)

// PATCH /messages/:id - update
app.patch(
    '/messages/:id',
    zValidator('json', zUpdateMessage),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedMessage = await db
            .update(messagesTable)
            .set(body)
            .where(eq(messagesTable.id, id))
            .returning()

        return c.json({ data: updatedMessage, message: 'Message updated' })
    },
)

// DELETE /messages/:id - delete
app.delete('/messages/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(messagesTable).where(eq(messagesTable.id, id))

    return c.json({ message: 'Message deleted' })
})

// DELETE /messages - delete many
app.delete(
    '/messages',
    zValidator('json', zDeleteMessage),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const messageId of body.messageIds) {
            await db
                .delete(messagesTable)
                .where(eq(messagesTable.id, messageId))
        }

        return c.json({ message: 'Messages deleted' })
    },
)

export default app
