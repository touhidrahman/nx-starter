import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { tasksTable } from '../../core/db/schema'
import { authMiddleware } from '../../core/middlewares/auth.middleware'
import checkTaskOwnershipMiddleware from '../../core/middlewares/check-ownership.middleware'
import { zDeleteTask, zInsertTask, zUpdateTask } from './tasks.schema'
import { zId } from '../../core/models/common.schema'
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteAllTask,
    deleteTask,
} from './tasks.service'

const app = new Hono()

// GET /tasks - list all
app.get('', authMiddleware, async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const tasks = await getAllTasks(groupId)

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
    zValidator('param', zId),
    checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    async (c) => {
        const id = c.req.param('id')
        const task = await getTaskById(id)

        if (task.length === 0) {
            return c.json({ message: 'Task not found' }, 404)
        }

        return c.json({ data: task[0], message: 'Task found' })
    },
)

// POST /tasks - create one
app.post('', zValidator('json', zInsertTask), authMiddleware, async (c) => {
    const body = c.req.valid('json')

    const newTask = await createTask(body)

    return c.json({ data: newTask, message: 'Task created' })
})

// PATCH /tasks/:id - update
app.patch(
    '/:id',
    zValidator('param', zId),
    zValidator('json', zUpdateTask),
    authMiddleware,
    checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    async (c) => {
        const id = c.req.param('id')
        const body = c.req.valid('json')
        const payload = await c.get('jwtPayload')

        const updatedTask = await updateTask(body, id, payload.groupId)

        return c.json({ data: updatedTask, message: 'Task updated' })
    },
)

// DELETE /tasks/:id - delete
app.delete(
    '/:id',
    zValidator('param', zId),
    authMiddleware,
    checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    async (c) => {
        const id = c.req.param('id')

        await deleteTask(id)

        return c.json({ message: 'Task deleted' })
    },
)

// DELETE /tasks - delete many
app.delete('', zValidator('json', zDeleteTask), authMiddleware, async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        for (const taskId of body.taskIds) {
            await deleteAllTask(taskId, payload.groupId)
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
