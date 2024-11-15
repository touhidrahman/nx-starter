import { createRoute, z } from '@hono/zod-openapi'
import { CREATED, NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { getTaskById } from '../tasks.service'
import { zSelectTask } from '../tasks.schema'
import checkTaskOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { tasksTable } from '../../../core/db/schema'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const getTaskRoute = createRoute({
    path: '/v1/tasks/:id',
    tags: ['Task'],
    method: 'get',
    middleware: [
        authMiddleware,
        checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    ],
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectTask),
                message: z.string(),
                success: z.boolean(),
            },
            'Task details',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Task not found',
        ),
    },
})

export const getTaskHandler: AppRouteHandler<typeof getTaskRoute> = async (
    c,
) => {
    const id = c.req.param('id')
    const task = await getTaskById(id)

    if (task.length === 0) {
        return c.json(jsonResponse({}, 'Task not found', NOT_FOUND), NOT_FOUND)
    }
    return c.json(jsonResponse(task, 'Task details', OK), OK)
}
