import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import checkTaskOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { tasksTable } from '../../../core/db/schema'
import { deleteTask, getTaskById } from '../tasks.service'
import { checkToken } from '../../auth/auth.middleware'

export const deleteTaskRoute = createRoute({
    path: '/v1/tasks/:id',
    method: 'delete',
    tags: ['Task'],
    middleware: [
        checkToken,
        checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    ] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(zEmpty, 'Task deleted successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'Task not found'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const deleteTaskHandler: AppRouteHandler<
    typeof deleteTaskRoute
> = async (c) => {
    const id = c.req.param('id')

    try {
        const task = await getTaskById(id)
        if (!task) {
            return c.json(
                { data: {}, message: 'Item not found', success: false },
                NOT_FOUND,
            )
        }

        await deleteTask(id)
        return c.json(
            { data: task, message: 'Task details', success: true },
            OK,
        )
    } catch (error) {
        return c.json(
            {
                data: {},
                message: 'Internal Server Error',
                error,
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
