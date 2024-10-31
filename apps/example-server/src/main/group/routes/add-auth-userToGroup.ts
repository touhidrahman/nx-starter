import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zInsertGroup, zSelectGroup } from '../group.schema'
import { groupService } from '../group.service'
import { ROLE_MEMBER, zSelectUser } from '../../user/user.schema'
import { findAuthUserByEmail } from '../../auth/auth.service'
import { createUser } from '../../user/user.service'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'

export const addAuthUserToGroupRoute = createRoute({
    path: '/v1/group/:id/add-user',
    method: 'post',
    tags: ['Group'],
    middleware: [checkToken, isGroupOwner],
    request: {
        body: jsonContent(z.object({ email: z.string() }), 'Group Detail'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectUser, 'User added to group successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})
export const addAuthUserToGroupHandler: AppRouteHandler<
    typeof addAuthUserToGroupRoute
> = async (c: any) => {
    const id = c.req.param('id')
    const { email } = c.req.valid('json')

    try {
        const authUser = await findAuthUserByEmail(email.toLowerCase())

        if (!authUser) {
            return c.json({ error: 'User not found' }, 404)
        }

        const exists = await groupService.isParticipant(authUser.id, id)
        if (exists) {
            return c.json({ error: 'User already belongs to group' }, 400)
        }

        const result = await createUser({
            authUserId: authUser.id,
            groupId: id,
            role: ROLE_MEMBER,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            email: authUser.email,
        })

        return c.json({ data: result, message: 'User added to group' }, 201)
    } catch (error) {
        return c.json({ error: 'Error adding user to group' }, 500)
    }
}
