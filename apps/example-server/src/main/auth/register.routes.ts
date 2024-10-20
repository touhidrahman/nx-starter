import { createRoute } from '@hono/zod-openapi'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { zRegister } from './auth.schema'
import * as HttpStatusCode from 'stoker/http-status-codes'
import { zMessage } from '../../core/models/common.schema'
import * as argon2 from 'argon2'
import { AppRouteHandler } from '../../core/core.type'
import { countAuthUserByEmail, isFirstAuthUser } from './auth.service'
import { authUsersTable } from '../../core/db/schema'
import { createVerficationToken } from './token.util'
import { db } from '../../core/db/db'

const tags = ['Auth']

export const registerRoute = createRoute({
    path: '/v1/register',
    method: 'post',
    tags,
    request: {
        body: jsonContentRequired(zRegister, 'User registration details'),
    },
    responses: {
        [HttpStatusCode.CREATED]: jsonContent(
            zMessage,
            'User registration successful',
        ),
        [HttpStatusCode.CONFLICT]: jsonContent(zMessage, 'User already exists'),
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
            { message: 'Email already exists' },
            HttpStatusCode.CONFLICT,
        )
    }

    // is auth table empty?
    const isFirstUser = await isFirstAuthUser()

    // Insert new user
    const createdAuthUser = await db
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

    const userId = createdAuthUser[0].id

    // Generate verification token
    if (!isFirstUser) {
        const verificationToken = await createVerficationToken(
            email,
            userId.toString(),
        )
        console.log('TCL: | verificationToken:', verificationToken)

        // TODO: send verification email
    }

    return c.json({ message: 'Account created' }, 201)
}
