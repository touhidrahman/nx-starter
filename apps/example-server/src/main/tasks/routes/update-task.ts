import { createRoute, z } from '@hono/zod-openapi'
import {
    BAD_REQUEST,
    OK,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import checkTaskOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { tasksTable } from '../../../core/db/schema'
import { zSelectTask, zUpdateTask } from '../tasks.schema'
import { getTaskById, updateTask } from '../tasks.service'

export const updateTaskRoute = createRoute({
    path: '/v1/tasks/:id',
    method: 'patch',
    tags: ['Task'],
    middleware: [
        authMiddleware,
        checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    ],
    request: {
        param: z.object({ id: z.string() }),
        body: jsonContent(zUpdateTask, 'Task details'),
    },
    responses: {
        [OK]: ApiResponse(
            zSelectTask,

            'Task updated successfully',
        ),
        [BAD_REQUEST]: ApiResponse(
            zEmpty,

            'Invalid task data',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            zEmpty,

            'Internal server error',
        ),
        [NOT_FOUND]: ApiResponse(
            zEmpty,

            'Task not found',
        ),
    },
})

export const updateTaskHandler: AppRouteHandler<
    typeof updateTaskRoute
> = async (c) => {
    const id = c.req.param('id')
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        const existingTask = await getTaskById(id)
        if (!existingTask) {
            return c.json(
                jsonResponse({}, 'Task not found', NOT_FOUND),
                NOT_FOUND,
            )
        }
        const updatedTask = await updateTask(body, id, payload.groupId)

        return c.json(
            jsonResponse(updatedTask, 'Task created successfully', OK),
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Bad request',
                    success: false,
                    error: error.errors,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error updating task:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
