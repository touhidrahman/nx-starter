import { createRoute, z } from '@hono/zod-openapi'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty, zId } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zSelectUser } from '../../user/user.schema'
import { setDefaultGroupId } from '../auth.service'

export const setDefaulGroupRoute = createRoute({
    path: '/v1/user/:id',
    tags: ['User'],
    method: 'post',
    middleware: [checkToken] as const,
    request: {
        params: zId,
        body: jsonContent(
            z.object({
                groupId: z.string(),
            }),
            'Set default group id to user',
        ),
    },
    responses: {
        [OK]: ApiResponse(zSelectUser, 'User detail'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found!'),
    },
})

export const setDefaultGroupHandler: AppRouteHandler<
    typeof setDefaulGroupRoute
> = async (c) => {
    const userId = c.req.param('id')
    const { groupId } = await c.req.valid('json')

    const [user] = await setDefaultGroupId(userId, groupId)

    if (!user) {
        return c.json(
            { data: {}, message: 'Something went wrong', success: false },
            NOT_FOUND,
        )
    }

    return c.json(
        {
            data: { ...user, password: '' },
            message: 'Set default auth user',
            success: true,
        },
        OK,
    )
}
