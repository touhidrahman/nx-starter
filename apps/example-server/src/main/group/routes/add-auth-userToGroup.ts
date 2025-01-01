import { createRoute, z } from '@hono/zod-openapi'
import {
    CREATED,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { isParticipant } from '../group.service'
import { ROLE_MEMBER, zSelectUser } from '../../user/user.schema'
import { findAuthUserByEmail } from '../../auth/auth.service'
import { createUser } from '../../user/user.service'
import { isGroupOwner } from '../../../core/middlewares/is-group-owner.middleware'

export const addAuthUserToGroupRoute = createRoute({
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
export const addAuthUserToGroupHandler: AppRouteHandler<
    typeof addAuthUserToGroupRoute
> = async (c) => {
    const id = c.req.param('id')
    const { email } = c.req.valid('json')

    try {
        const authUser = await findAuthUserByEmail(email.toLowerCase())

        if (!authUser) {
            return c.json(
                { data: {}, success: false, message: 'User not found' },
                NOT_FOUND,
            )
        }

        const exists = await isParticipant(authUser.id, id)
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

        const [result] = await createUser({
            authUserId: authUser.id,
            groupId: id,
            role: ROLE_MEMBER,
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            email: authUser.email,
        })

        return c.json(
            { data: result, success: true, message: 'User added to group' },
            CREATED,
        )
    } catch (error) {
        return c.json(
            { message: 'Error adding user to group', data: {}, success: false },
            INTERNAL_SERVER_ERROR,
        )
    }
}
