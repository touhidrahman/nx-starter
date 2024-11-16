import { createRoute } from '@hono/zod-openapi'
import * as HttpStatusCodes from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { findAuthUserByEmail } from '../auth.service'
import { createVerficationToken } from '../token.util'

const tags = ['Auth']

export const forgotPasswordRoute = createRoute({
    path: '/v1/forgot-password',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(
            z.object({ email: z.string().email() }),
            'Email',
        ),
    },
    responses: {
        [HttpStatusCodes.OK]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'Password reset email sent',
        ),
        [HttpStatusCodes.NOT_FOUND]: ApiResponse(
            { data: zEmpty, message: z.string(), success: z.boolean() },
            'User not found',
        ),
    },
})

export const forgotPasswordHandler: AppRouteHandler<
    typeof forgotPasswordRoute
> = async (c) => {
    const { email } = c.req.valid('json')
    const user = await findAuthUserByEmail(email)

    if (!user) {
        return c.json(
            { message: 'User not found', data: {} },
            HttpStatusCodes.NOT_FOUND,
        )
    }

    const token = await createVerficationToken(email, user.id.toString(), {
        unit: 'day',
        value: 7,
    })
    // TODO send the token to the user via email
    console.log(`Password reset token for ${email}: ${token}`)

    return c.json({ message: 'Password reset email sent', data: {} })
}
