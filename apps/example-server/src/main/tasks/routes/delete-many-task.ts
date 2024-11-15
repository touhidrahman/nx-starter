import { createRoute, z } from '@hono/zod-openapi'
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { deleteAllTask } from '../tasks.service'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const deleteManyTaskRoute = createRoute({
    path: '/v1/tasks',
    method: 'delete',
    tags: ['Task'],
    middleware: [authMiddleware],
    request: {
        body: jsonContent(
            z.object({ ids: z.array(z.string()) }),
            'Task details',
        ),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Task deleted successfully',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Task not found',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Internal server error',
        ),
    },
})

export const deleteManyTaskHandler: AppRouteHandler<
    typeof deleteManyTaskRoute
> = async (c) => {
    const body = c.req.valid('json')
    const payload = await c.get('jwtPayload')

    try {
        for (const taskId of body.ids) {
            await deleteAllTask(taskId, payload.groupId)
        }
    } catch (error) {
        console.error(
            'Error deleting task:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to delete tasks', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR,
        )
    }
    return c.json(jsonResponse('', 'Tasks deleted successfully', OK), OK)
}
