import { zValidator } from '@hono/zod-validator'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'
import { db } from '../../core/db/db'
import { tasksTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkTaskOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import { zDeleteTask, zInsertTask, zUpdateTask } from './tasks.schema'

const app = new Hono()

// GET /tasks - list all
app.get('', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const tasks = await db
            .select({ ...getTableColumns(tasksTable) })
            .from(tasksTable)
            .where(eq(tasksTable.groupId, groupId))
            .limit(100)

        return c.json({ data: tasks, message: 'Tasks list' })
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }
})

// GET /tasks/:id - find one
app.get(
    '/:id',
    authMiddleware,
    zValidator('param', z.object({ id: z.coerce.number() })),
    checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    async (c) => {
        const id = c.req.param('id')
        const task = await db
            .select({ ...getTableColumns(tasksTable) })
            .from(tasksTable)
            .where(eq(tasksTable.id, id))
            .limit(1)

        if (task.length === 0) {
            return c.json({ message: 'Task not found' }, 404)
        }

        return c.json({ data: task[0], message: 'Task found' })
    },
)

// POST /tasks - create one
app.post('', zValidator('json', zInsertTask), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newTask = await db.insert(tasksTable).values(body).returning()

    return c.json({ data: newTask, message: 'Task created' })
})

// PATCH /tasks/:id - update
app.patch(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator('json', zUpdateTask),
    authMiddleware,
    checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedTask = await db
            .update(tasksTable)
            .set(body)
            .where(
                and(
                    eq(tasksTable.id, id),
                    eq(tasksTable.groupId, payload.groupId),
                ),
            )
            .returning()

        return c.json({ data: updatedTask, message: 'Task updated' })
    },
)

// DELETE /tasks/:id - delete
app.delete(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    authMiddleware,
    checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    async (c) => {
        const id = c.req.param('id')

        await db.delete(tasksTable).where(eq(tasksTable.id, id))

        return c.json({ message: 'Task deleted' })
    },
)

// DELETE /tasks - delete many
app.delete('', zValidator('json', zDeleteTask), authMiddleware, async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        for (const taskId of body.taskIds) {
            await db
                .delete(tasksTable)
                .where(
                    and(
                        eq(tasksTable.id, taskId),
                        eq(tasksTable.groupId, payload.groupId),
                    ),
                )
        }
    } catch (error: any) {
        return c.json(
            { error: 'Internal server error', message: error.message },
            500,
        )
    }

    return c.json({ message: 'Tasks deleted' })
})

export default app
