import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../../auth/auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { InviteDto, zCreateInvite, zSelectInvite } from '../invite.schema'
import { AppRouteHandler } from '../../../core/core.type'
import { createInvite } from '../invite.service'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'
import { zEmpty } from '../../../core/models/common.schema'

export const createInviteRoute = createRoute({
    path: '/v1/invites/create-invite',
    method: 'post',
    tags: ['Invite'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zCreateInvite, 'Invite details'),
    },
    responses: {
        [OK]: ApiResponse(zSelectInvite, 'Create Invite successfully!'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Server error'),
    },
})

export const createInviteHandler: AppRouteHandler<
    typeof createInviteRoute
> = async (c) => {
    const body = c.req.valid('json') as InviteDto
    const payload = await c.get('jwtPayload')

    try {
        const [invite] = await createInvite(body, payload.userId)
        return c.json(
            {
                data: invite,
                message: 'Invite has been succesfull!',
                success: true,
            },
            OK,
        )
    } catch (e) {
        return c.json(
            {
                data: {},
                message: 'Invite has been unsuccesfull!',
                success: false,
                error: e,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
