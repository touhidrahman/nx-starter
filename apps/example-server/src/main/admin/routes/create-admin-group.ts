import { createRoute, z } from '@hono/zod-openapi'
import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
} from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { zEmpty } from '../../../core/models/common.schema'
import { checkToken } from '../../auth/auth.middleware'
import { zInsertGroup, zSelectGroup } from '../admin-groups.schema'
import { createGroup } from '../admin-groups.service'
import { ApiResponse } from '../../../core/utils/api-response.util'

export const createAdminGroupRoute = createRoute({
    path: '/v1/admin-groups',
    method: 'post',
    tags: ['Admin Group'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zInsertGroup, 'Admin group details'),
    },
    responses: {
        [CREATED]: ApiResponse(
            zSelectGroup,
            'Admin group created successfully',
        ),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid admin group data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createAdminGroupHandler: AppRouteHandler<
    typeof createAdminGroupRoute
> = async (c) => {
    const body = c.req.valid('json')

    try {
        const [newGroup] = await createGroup(body)
        return c.json(
            {
                data: newGroup,
                message: 'Admin group created successfully',
                success: true,
            },
            CREATED,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message: 'Invalid admin group data',
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        console.error(
            'Error creating admin group:',
            error instanceof Error ? error.message : 'Unknown error',
        )
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            {
                data: {},
                message: 'Internal server error',
                success: false,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
