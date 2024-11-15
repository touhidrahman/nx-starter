import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import {} from '../../group/group.service'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zSelectTask } from '../tasks.schema'
import { getAllTasks } from '../tasks.service'
import { zEmpty } from '../../../core/models/common.schema'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const getTaskListRoute = createRoute({
    path: '/v1/tasks',
    tags: ['Task'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(
            {
                data: z.array(zSelectTask),
                message: z.string(),
                success: z.boolean(),
            },
            'List of Task',
        ),
        [NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'No tasks found!',
        ),
    },
})

export const getTaskListHandler: AppRouteHandler<
    typeof getTaskListRoute
> = async (c: any) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const tasks = await getAllTasks(groupId)

        return c.json(jsonResponse(tasks, 'Tasks list', OK), OK)
    } catch (error: any) {
        return c.json(jsonResponse({}, error.message, NOT_FOUND), NOT_FOUND)
    }
}
