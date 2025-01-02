import { createRoute, z } from '@hono/zod-openapi'
import { and, eq } from 'drizzle-orm'
import { BAD_REQUEST, CREATED } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { db } from '../../../core/db/db'
import {
    groupsTable,
    usersGroupsTable,
    usersTable,
} from '../../../core/db/schema'
import { sendEmailUsingResend } from '../../../core/email/email.service'
import { zEmpty } from '../../../core/models/common.schema'
import { ApiResponse } from '../../../core/utils/api-response.util'
import env from '../../../env'
import { buildSuccessEmailTemplate } from '../../email/templates/success-template'
import { zInsertGroup, zSelectGroup } from '../../group/group.schema'
import { findUserById } from '../../user/user.service'
import { checkToken } from '../auth.middleware'

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
    const { sub: userId } = await c.get('jwtPayload')
    const { type } = c.req.valid('param')

    const user = await findUserById(userId)

    if (!user) {
        return c.json(
            { success: false, message: 'User not found', data: {} },
            BAD_REQUEST,
        )
    }

    // check if already a owner of a group
    const [ownedGroupByType] = await db
        .select()
        .from(groupsTable)
        .where(
            and(
                eq(groupsTable.ownerId, userId),
                eq(groupsTable.type, type),
            ),
        )
        .limit(1)

    if (ownedGroupByType) {
        return c.json(
            {
                success: false,
                message: `You already have a ${type} profile`,
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
            ownerId: user.id,
            name:
                body.name ??
                `${user.firstName} ${user.lastName}'s Organization`,
            type,
            email: body.email ?? user.email,
        })
        .returning()

    await db
        .insert(usersGroupsTable)
        .values({ groupId: group.id, userId: user.id, role: 'admin' })
        .returning()

    // update user with default group id
    await db
        .update(usersTable)
        .set({ defaultGroupId: group.id })
        .where(eq(usersTable.id, userId))
        .returning()

    const createProfileSuccess = buildSuccessEmailTemplate({
        recipientName: `${user.firstName} ${user.lastName}`,
        profileType: group.type,
        dashboardUrl: `${env.FRONTEND_URL}/dashboard`,
        organizationName: group.name,
    })

    const { data, error } = await sendEmailUsingResend(
        [user.email ?? ''],
        'Profile created successfully.',
        createProfileSuccess,
    )

    // TODO: log sending email error

    return c.json(
        { data: group, success: true, message: `${type} profile created` },
        CREATED,
    )
}
