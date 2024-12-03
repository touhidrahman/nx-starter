import { createRoute } from '@hono/zod-openapi'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { z } from 'zod'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { findAuthUserByEmail } from '../auth.service'
import { createVerficationToken } from '../token.util'
import { NOT_FOUND, OK } from 'stoker/http-status-codes'
import { sendEmailUsingResend } from '../../../core/email/email.service'
import { buildForgotPasswordEmailTemplate } from '../../email/templates/forgot-password'
import env from '../../../env'

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
        [OK]: ApiResponse(zEmpty, 'Password reset email sent'),
        [NOT_FOUND]: ApiResponse(zEmpty, 'User not found'),
    },
})

export const forgotPasswordHandler: AppRouteHandler<
    typeof forgotPasswordRoute
> = async (c) => {
    const { email } = c.req.valid('json')
    const user = await findAuthUserByEmail(email)

    if (!user) {
        return c.json(
            { message: 'User not found', data: {}, success: false },
            NOT_FOUND,
        )
    }

    const token = await createVerficationToken(email, user.id.toString(), {
        unit: 'day',
        value: 7,
    })
    console.log(`Password reset token for ${email}: ${token}`)

    const forgotPasswordTemplate = buildForgotPasswordEmailTemplate({
        firstName: user.firstName,
        lastName: user.lastName,
        resetPasswordUrl: `${env.FRONTEND_URL}/forgot-password/${token}`,
    })
    const { data, error } = await sendEmailUsingResend(
        [user.email],
        'Forgot Password?',
        forgotPasswordTemplate,
    )
    // TODO log email sending error

    return c.json({
        message: 'Password reset email sent',
        data: {},
        success: true,
    })
}
