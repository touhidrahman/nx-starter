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
import { GroupDto, zInsertGroup, zSelectGroup } from '../group.schema'
import { groupService } from '../group.service'

export const createGroupRoute = createRoute({
    path: '/v1/group',
    method: 'post',
    tags: ['Group'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertGroup, 'Group Detail'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectGroup, 'Group created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid group data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})
export const createGroupHandler: AppRouteHandler<
    typeof createGroupRoute
> = async (c: any) => {
    const body = c.req.valid('json') as GroupDto
    const { userId, role, groupId } = await c.get('jwtPayload')
    try {
        // check if group already created where he is a owner
        const hasOwnedGroup = await groupService.isOwner(userId, groupId)
        if (hasOwnedGroup) {
            return c.json(
                {
                    message: 'You already have a group owned by you',
                },
                403,
            )
        }

        // Insert a new entry into groups
        const [newGroup] = await groupService.createGroup({
            ...body,
            ownerId: userId,
        })

        return c.json({ data: newGroup, message: 'Group created' }, 201)
    } catch (error) {
        return c.json({ error, message: 'Error creating group' }, 500)
    }
}
