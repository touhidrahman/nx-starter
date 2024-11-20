import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zEmpty } from '../../../core/models/common.schema'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zSelectTask, zUpdateTask } from '../tasks.schema'
import { createTask } from '../tasks.service'
import checkTaskOwnershipMiddleware from '../../../core/middlewares/check-ownership.middleware'
import { tasksTable } from '../../../core/db/schema'

export const createTaskRoute = createRoute({
    path: '/v1/tasks',
    method: 'post',
    tags: ['Task'],
    middleware: [
        authMiddleware,
        checkTaskOwnershipMiddleware(tasksTable, 'Task'),
    ],
    request: {
        body: jsonContent(zUpdateTask, 'Task details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectTask, 'Task created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid task data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createTaskHandler: AppRouteHandler<
    typeof createTaskRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const task = await createTask(body)
        return c.json(
            jsonResponse(task, 'Task created successfully', CREATED),
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                jsonResponse({}, 'Invalid task details', BAD_REQUEST),
                BAD_REQUEST,
            )
        }
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse(
                {},
                'Task created successfully',
                INTERNAL_SERVER_ERROR,
            ),
            INTERNAL_SERVER_ERROR,
        )
    }
}
