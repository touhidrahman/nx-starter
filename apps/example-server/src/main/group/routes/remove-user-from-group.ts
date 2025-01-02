import { createRoute, z } from '@hono/zod-openapi'
import { and, eq } from 'drizzle-orm'
import {
    BAD_REQUEST,
    OK
} from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersGroupsTable } from '../../../core/db/schema'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'

export const removeUserFromGroupRoute = createRoute({
    path: '/v1/groups/:id/remove-user/:userId',
    method: 'delete',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner] as const,
    request: {
        params: z.object({ id: z.string(), userId: z.string() }),
    },
    responses: {
        [OK]: ApiResponse(
            zEmpty,
            'User deleted from group successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
    },
})
export const removeUserFromGroupHandler: AppRouteHandler<
    typeof removeUserFromGroupRoute
> = async (c) => {
    const id = c.req.param('id')
    const userId = c.req.param('userId')

    const user = await db.delete(usersGroupsTable).where(and(eq(usersGroupsTable.userId, userId), eq(usersGroupsTable.groupId, id))).execute()
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
        OK,
    )
}
