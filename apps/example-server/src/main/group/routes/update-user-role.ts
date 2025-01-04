import { createRoute, z } from '@hono/zod-openapi'
import { CREATED, INTERNAL_SERVER_ERROR } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersGroupsTable } from '../../../core/db/schema'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zUpdateUserRole } from '../group.schema'

export const updateUserRoleRoute = createRoute({
    path: '/v1/groups/:id/update-user-role',
    method: 'post',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner] as const,
    request: {
        params: z.object({ id: z.string() }),
        body: jsonContent(zUpdateUserRole, 'User ID and Role'),
    },
    responses: {
        [CREATED]: ApiResponse(zEmpty, 'User Role updated successfully'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})
export const updateUserRoleHandler: AppRouteHandler<
    typeof updateUserRoleRoute
> = async (c) => {
    const { id: groupId } = c.req.param()
    const { userId, role } = c.req.valid('json')

    try {
        await db
            .insert(usersGroupsTable)
            .values({
                groupId,
                userId,
                role: role as any,
            })
            .onConflictDoUpdate({
                target: [usersGroupsTable.groupId, usersGroupsTable.userId],
                set: { role: role as any },
            })
            .returning()

        return c.json(
            { data: {}, message: 'User role updated', success: true },
            CREATED,
        )
    } catch (error) {
        return c.json(
            {
                message: 'Error adding user to group',
                error,
                data: {},
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
