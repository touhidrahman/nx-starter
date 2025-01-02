import { createRoute, z } from '@hono/zod-openapi'
import { and, eq } from 'drizzle-orm'
import { BAD_REQUEST, CREATED } from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersGroupsTable } from '../../../core/db/schema'
import { isGroupParticipant } from '../../../core/middlewares/is-group-owner.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'

export const leaveGroupRoute = createRoute({
    path: '/v1/groups/:id/leave',
    method: 'delete',
    tags: ['Group'],
    middleware: [checkToken, isGroupParticipant] as const,
    request: {
        params: z.object({ id: z.string() }),
    },
    responses: {
        [CREATED]: ApiResponse(zEmpty, 'User deleted from group successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
    },
})
export const leaveGroupHandler: AppRouteHandler<
    typeof leaveGroupRoute
> = async (c) => {
    const id = c.req.param('id')
    const { userId } = await c.get('jwtPayload')

    const [user] = await db
        .delete(usersGroupsTable)
        .where(
            and(
                eq(usersGroupsTable.groupId, id),
                eq(usersGroupsTable.userId, userId),
            ),
        )
        .returning()
    if (!user) {
        return c.json(
            {
                message: 'User does not belong to group',
                data: {},
                success: false,
            },
            BAD_REQUEST,
        )
    }

    return c.json(
        { data: {}, message: 'User removed from group', success: true },
        CREATED,
    )
}
