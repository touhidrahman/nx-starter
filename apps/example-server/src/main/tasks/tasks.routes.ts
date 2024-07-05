import { zValidator } from '@hono/zod-validator'
import { eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import { db } from '../../core/db/db'
import { tasksTable } from '../../core/db/schema'
import { zDeleteTask, zInsertTask, zUpdateTask } from './tasks.schema'

const app = new Hono()

const secret = process.env.ACCESS_TOKEN_SECRET ?? ''

const authMiddleware = jwt({ secret })

// GET /tasks - list all
app.get('/tasks', authMiddleware, async (c) => {
    const tasks = await db
        .select({ ...getTableColumns(tasksTable) })
        .from(tasksTable)
        .limit(100)

    return c.json({ data: tasks, message: 'Tasks list' })
})

// GET /tasks/:id - find one
app.get('/tasks/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)
    const task = await db
        .select({ ...getTableColumns(tasksTable) })
        .from(tasksTable)
        .where(eq(tasksTable.id, id))
        .limit(1)

    if (task.length === 0) {
        return c.json({ message: 'Task not found' }, 404)
    }

    return c.json({ data: task[0], message: 'Task found' })
})

// POST /tasks - create one
app.post(
    '/tasks',
    zValidator('json', zInsertTask),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        const newTask = await db.insert(tasksTable).values(body).returning()

        return c.json({ data: newTask, message: 'Task created' })
    },
)

// PATCH /tasks/:id - update
app.patch(
    '/tasks/:id',
    zValidator('json', zUpdateTask),
    authMiddleware,
    async (c) => {
        const id = parseInt(c.req.param('id'), 10)
        const body = c.req.valid('json')

        const updatedTask = await db
            .update(tasksTable)
            .set(body)
            .where(eq(tasksTable.id, id))
            .returning()

        return c.json({ data: updatedTask, message: 'Task updated' })
    },
)

// DELETE /tasks/:id - delete
app.delete('/tasks/:id', authMiddleware, async (c) => {
    const id = parseInt(c.req.param('id'), 10)

    await db.delete(tasksTable).where(eq(tasksTable.id, id))

    return c.json({ message: 'Task deleted' })
})

// DELETE /tasks - delete many
app.delete(
    '/tasks',
    zValidator('json', zDeleteTask),
    authMiddleware,
    async (c) => {
        const body = c.req.valid('json')

        for (const taskId of body.taskIds) {
            await db.delete(tasksTable).where(eq(tasksTable.id, taskId))
        }

        return c.json({ message: 'Tasks deleted' })
    },
)

export default app
