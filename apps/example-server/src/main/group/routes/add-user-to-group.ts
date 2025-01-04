import { createRoute, z } from '@hono/zod-openapi'
import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { usersGroupsTable } from '../../../core/db/schema'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { findUserByEmail } from '../../auth/auth.service'
import { USER_ROLE_MEMBER, zSelectUser } from '../../user/user.schema'
import { isParticipant } from '../group.service'

export const addUserToGroupRoute = createRoute({
    path: '/v1/groups/:id/add-user',
    method: 'post',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner] as const,
    request: {
        body: jsonContent(z.object({ email: z.string() }), 'Group Detail'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectUser, 'User added to group successfully'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})
export const addUserToGroupHandler: AppRouteHandler<
    typeof addUserToGroupRoute
> = async (c) => {
    const id = c.req.param('id')
    const { email } = c.req.valid('json')

    try {
        const user = await findUserByEmail(email.toLowerCase())

        if (!user) {
            return c.json(
                { data: {}, success: false, message: 'User not found' },
                NOT_FOUND,
            )
        }

        const exists = await isParticipant(user.id, id)
        if (exists) {
            return c.json(
                {
                    data: {},
                    success: false,
                    message: 'User already belongs to group',
                },
                BAD_REQUEST,
            )
        }

        // add user to group
        await db.insert(usersGroupsTable).values({
            userId: user.id,
            groupId: id,
            role: USER_ROLE_MEMBER,
        })

        return c.json(
            { data: user, success: true, message: 'User added to group' },
            CREATED,
        )
    } catch (error) {
        return c.json(
            { message: 'Error adding user to group', data: {}, success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
