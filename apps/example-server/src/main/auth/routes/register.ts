import { createRoute, z } from '@hono/zod-openapi'
import * as argon2 from 'argon2'
import { CONFLICT, CREATED } from 'stoker/http-status-codes'
import { jsonContentRequired } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import { authUsersTable } from '../../../core/db/schema'
import { sendEmailUsingResend } from '../../../core/email/email.service'
import { buildWelcomeEmailTemplate } from '../../email/templates/welcome'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import env from '../../../env'
import { zRegister } from '../auth.schema'
import { countAuthUserByEmail, isFirstAuthUser } from '../auth.service'
import { createVerficationToken } from '../token.util'
import { logger, pinoLogger } from 'hono-pino'
import pino from 'pino'

const tags = ['Auth']

export const registerRoute = createRoute({
    path: '/v1/register',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(zRegister, 'User registration details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            z.object({ id: z.string() }),
            'User registration successful',
        ),
        [CONFLICT]: ApiResponse(zEmpty, 'Email already exists'),
    },
})

export const registerHandler: AppRouteHandler<typeof registerRoute> = async (
    c,
) => {
    const { email, password, firstName, lastName, level } = c.req.valid('json')
    const hash = await argon2.hash(password)

    // some checks
    const exists = await countAuthUserByEmail(email)

    if (exists > 0) {
        return c.json(
            { message: 'Email already exists', data: {}, success: false },
            CONFLICT,
        )
    }

    // is auth table empty?
    const isFirstUser = await isFirstAuthUser()

    // Insert new user
    const [createdAuthUser] = await db
        .insert(authUsersTable)
        .values({
            email,
            password: hash,
            firstName,
            lastName,
            level: isFirstUser ? 'admin' : level,
            verified: isFirstUser, // First user is auto-verified
        })
        .returning()

    const userId = createdAuthUser.id

    // Generate verification token
    if (!isFirstUser) {
        const token = await createVerficationToken(email, userId.toString(), {
            unit: 'day',
            value: 7,
        })

        if (env.NODE_ENV !== 'production') {
            console.log('TCL: | verificationToken:', token)
        }

        const welcomeEmail = buildWelcomeEmailTemplate({
            firstName: createdAuthUser.firstName,
            lastName: createdAuthUser.lastName,
            email:
                env.NODE_ENV !== 'production'
                    ? env.EMAIL_TEST_EMAIL
                    : createdAuthUser.email,
            verificationUrl: `${env.FRONTEND_URL}/account-verify/${token}`,
        })
        const { data, error } = await sendEmailUsingResend(
            [createdAuthUser.email],
            'Please verify your email',
            welcomeEmail,
        )
        // TODO: log email sending error
    }

    return c.json(
        { message: 'Account created', success: true, data: { id: userId } },
        CREATED,
    )
}
