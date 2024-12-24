import { createRoute, z } from '@hono/zod-openapi'
import { checkToken } from '../auth.middleware'
import { jsonContent } from 'stoker/openapi/helpers'
import { zInsertGroup, zSelectGroup } from '../../group/group.schema'
import { BAD_REQUEST, CREATED, OK } from 'stoker/http-status-codes'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import {
    authUsersTable,
    groupsTable,
    usersTable,
} from '../../../core/db/schema'
import { and, eq } from 'drizzle-orm'
import { zEmpty } from '../../../core/models/common.schema'
import { buildSuccessEmailTemplate } from '../../email/templates/success-template'
import { sendEmailUsingResend } from '../../../core/email/email.service'
import env from '../../../env'

export const createProfileRoute = createRoute({
    path: '/v1/create-profile/:type',
    method: 'post',
    tags: ['Auth'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertGroup, 'Group create input'),
        params: z.object({ type: z.enum(['client', 'vendor']) }),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectGroup, 'Vendor profile created'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid input'),
    },
})

/**
 * Create a group for the authenticated user. Type of groups: 'client' or 'vendor'.
 * One user can create at most one group per type (but may be member of multiple groups).
 * He will be the owner of the group.
 */
export const createProfileHandler: AppRouteHandler<
    typeof createProfileRoute
> = async (c) => {
    const body = c.req.valid('json')
    const { sub: authUserId } = await c.get('jwtPayload')
    const { type } = c.req.valid('param')

    const [authUser] = await db
        .select()
        .from(usersTable)
        .where(
            and(
                eq(groupsTable.ownerId, authUserId),
                eq(groupsTable.type, type),
            ),
        )
        .limit(1)

    // check if already a owner of a group
    const existingVendor = await db
        .select()
        .from(groupsTable)
        .where(eq(groupsTable.ownerId, authUserId))
        .limit(1)

    if (existingVendor.length > 0) {
        return c.json(
            {
                success: false,
                message: `${type} profile already exists`,
                data: {},
            },
            BAD_REQUEST,
        )
    }

    // create a group
    const [group] = await db
        .insert(groupsTable)
        .values({
            ...body,
            ownerId: authUserId,
            name:
                body.name ??
                `${authUser.firstName} ${authUser.lastName}'s Organization`,
            type,
            email: body.email ?? authUser.email,
        })
        .returning()

    // create user profile
    const [user] = await db
        .insert(usersTable)
        .values({
            authUserId,
            groupId: group.id,
            role: 'owner',
            firstName: authUser.firstName,
            lastName: authUser.lastName,
            email: authUser.email,
            phone: authUser.phone,
        })
        .returning()

    // update auth user with default group id
    await db
        .update(authUsersTable)
        .set({ defaultGroupId: group.id })
        .where(eq(authUsersTable.id, authUserId))
        .returning()

    const createProfileSuccess = buildSuccessEmailTemplate({
        recipientName: `${authUser.firstName} ${authUser.lastName}`,
        profileType: group.type,
        dashboardUrl: `${env.FRONTEND_URL}/dashboard`,
        organizationName: group.name,
    })

    const { data, error } = await sendEmailUsingResend(
        [authUser.email ?? ''],
        'Profile created successfully.',
        createProfileSuccess,
    )

    // TODO: log sending email error

    return c.json(
        { data: group, success: true, message: `${type} profile created` },
        CREATED,
    )
}
