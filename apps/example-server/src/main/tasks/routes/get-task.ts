import { createRoute, z } from '@hono/zod-openapi'
import { CREATED, NOT_FOUND, OK } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { getTaskById } from '../tasks.service'
import { zSelectTask } from '../tasks.schema'
import { tasksTable } from '../../../core/db/schema'
import { checkToken } from '../../auth/auth.middleware'

export const getTaskRoute = createRoute({
    path: '/v1/tasks/:id',
    tags: ['Task'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            z.array(zSelectTask),

            'Task details',
        ),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Task not found'),
    },
})

export const getTaskHandler: AppRouteHandler<typeof getTaskRoute> = async (
    c,
) => {
    const id = c.req.param('id')
    const task = await getTaskById(id)

    if (task.length === 0) {
        return c.json(
            { data: {}, message: 'Task not found', success: false },
            NOT_FOUND,
        )
    }
    return c.json({ data: task, message: 'Task details', success: true }, OK)
}
