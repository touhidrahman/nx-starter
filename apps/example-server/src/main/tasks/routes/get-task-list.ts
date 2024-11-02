import { createRoute, z } from '@hono/zod-openapi'
import { AppRouteHandler } from '../../../core/core.type'
import { groupService } from '../../group/group.service'
import { getGroupsRoute } from '../../group/routes/get-groups'
import { checkToken } from '../../auth/auth.middleware'
import { OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { zSelectGroup } from '../../group/group.schema'
import { authMiddleware } from '../../../core/middlewares/auth.middleware'
import { zSelectTask } from '../tasks.schema'
import { getAllTasks } from '../tasks.service'

export const getTaskListRoute = createRoute({
    path: '/v1/task',
    tags: ['Task'],
    method: 'get',
    middleware: [authMiddleware],
    request: {},
    responses: {
        [OK]: ApiResponse(z.array(zSelectTask), 'List of Task'),
    },
})

export const getTaskListHandler: AppRouteHandler<
    typeof getTaskListRoute
> = async (c: any) => {
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
}
