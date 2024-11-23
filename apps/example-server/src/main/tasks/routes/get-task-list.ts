import { createRoute, RouteConfig, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import {} from '../../group/group.service'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'

import { zSelectTask } from '../tasks.schema'
import { getAllTasks } from '../tasks.service'
import { zEmpty } from '../../../core/models/common.schema'
import { checkToken } from '../../auth/auth.middleware'

export const getTaskListRoute = createRoute({
    path: '/v1/tasks',
    tags: ['Task'],
    method: 'get',
    middleware: [checkToken] as const,
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectTask), 'List of Task'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'No tasks found!'),
    },
})

export const getTaskListHandler: AppRouteHandler<
    typeof getTaskListRoute
> = async (c) => {
    const payload = await c.get('jwtPayload')

    try {
        const groupId = payload.groupId
        const tasks = await getAllTasks(groupId)

        return c.json({ data: tasks, message: 'Tasks list', success: true }, OK)
    } catch (error: any) {
        return c.json(
            { data: {}, message: error.message, success: false, error: error },
            NOT_FOUND,
        )
    }
}
