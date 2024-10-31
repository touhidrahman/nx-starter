import { createRoute, z } from '@hono/zod-openapi'
import { CREATED, INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'stoker/http-status-codes'
import { jsonContent } from 'stoker/openapi/helpers'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { checkToken } from '../../auth/auth.middleware'
import { zEmpty } from '../../../core/models/common.schema'
import { zInsertGroup, zSelectGroup } from '../admin-groups.schema'
import { adminGroupsService } from '../admin-groups.service'

const jsonResponse = (data: any, message: string, status: number) => ({ data, message, status })

export const createAdminGroupRoute = createRoute({
    path: '/v1/admin-groups',
    method: 'post',
    tags: ['Admin Group'],
    middleware: [checkToken],
    request: {
        body: jsonContent(zInsertGroup, 'Admin group details'),
    },
    responses: {
        [CREATED]: ApiResponse(zSelectGroup, 'Admin group created successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid admin group data'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal server error'),
    },
})

export const createAdminGroupHandler: AppRouteHandler<typeof createAdminGroupRoute> = async (c) => {
    const body = c.req.valid('json')

    try {
        const newGroup = await adminGroupsService.createGroup(body)
        return c.json(jsonResponse(newGroup, 'Admin group created successfully', CREATED), CREATED)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(jsonResponse({}, 'Invalid admin group data', BAD_REQUEST), BAD_REQUEST)
        }
        console.error('Error creating admin group:', error instanceof Error ? error.message : 'Unknown error')
        if (error instanceof Error) console.error(error.stack)
        return c.json(
            jsonResponse({}, 'Failed to create admin group', INTERNAL_SERVER_ERROR),
            INTERNAL_SERVER_ERROR
        )
    }
}
