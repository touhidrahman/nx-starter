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
import { zInsertTask, zSelectTask, zUpdateTask } from '../tasks.schema'
import { createTask } from '../tasks.service'
import { tasksTable } from '../../../core/db/schema'
import { checkToken } from '../../auth/auth.middleware'

export const createTaskRoute = createRoute({
    path: '/v1/tasks',
    method: 'post',
    tags: ['Task'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertTask, 'Task details'),
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
        const [task] = await createTask(body)
        return c.json(
            { data: task, message: 'Task created successfully', success: true },
            CREATED,
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
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            { data: {}, message: 'Internal Server Error', success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
