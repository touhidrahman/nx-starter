import { createRoute } from '@hono/zod-openapi'
import { OK } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zInsertInvite, zSelectInvite } from '../../invite/invite.schema'
import { createInvite } from '../../invite/invite.service'
import { z } from 'zod'

const jsonResponse = (data: any, message: string, status: number) => ({
    data,
    message,
    status,
})

export const inviteUserRoute = createRoute({
    path: '/v1/invite',
    method: 'post',
    tags: ['User'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertInvite, 'Invite user details'),
    },
    responses: {
        [OK]: ApiResponse(
            { data: zSelectInvite, message: z.string(), success: z.boolean() },
            'Created invite',
        ),
    },
})

export const inviteUserHandler: AppRouteHandler<
    typeof inviteUserRoute
> = async (c) => {
    const body = c.req.valid('json')
    const payload = c.get('jwtPayload')

    const [invite] = await createInvite(body, payload.userId)

    return c.json(jsonResponse(invite, 'User invited', OK), OK)
}
