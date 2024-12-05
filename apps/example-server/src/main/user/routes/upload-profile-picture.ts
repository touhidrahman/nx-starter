import { createRoute, z } from '@hono/zod-openapi'
import {
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
} from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { uploadProfilePicture } from '../user.service'
import { checkToken } from '../../auth/auth.middleware'
import { uploadToS3AndGetUrl } from '../../../core/third-party/s3.service'
import { jsonContent } from 'stoker/openapi/helpers'
import { zProfilePicture, zSelectUser } from '../user.schema'

export const uploadProfilePictureRoute = createRoute({
    path: '/v1/user/profile-picture',
    method: 'post',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zProfilePicture, 'Profile picture'),
    },
    responses: {
        [OK]: ApiResponse(zSelectUser, 'Profile picture updated successfully'),
        [BAD_REQUEST]: ApiResponse(
            z.object({
                error: z.string(),
            }),
            'Invalid image',
        ),
        [INTERNAL_SERVER_ERROR]: ApiResponse(
            z.object({
                error: z.string(),
            }),
            'Server error',
        ),
    },
})
export const uploadProfilePictureHandler: AppRouteHandler<
    typeof uploadProfilePictureRoute
> = async (c) => {
    const body = await c.req.parseBody({ all: true })
    const file = body['file'] as File
    const userPayload = await c.get('jwtPayload')
    const userId = userPayload?.sub

    try {
        if (!file) {
            return c.json(
                {
                    data: {},
                    message: '',
                    error: 'No file provided',
                    success: false,
                },
                BAD_REQUEST,
            )
        }

        const allowedFormats = ['image/jpeg', 'image/png']
        if (!allowedFormats.includes(file.type)) {
            return c.json(
                {
                    data: {},
                    message: 'Invalid file type!',
                    success: false,
                },
                BAD_REQUEST,
            )
        }
        if (file.size > 5 * 1024 * 1024) {
            return c.json(
                {
                    data: {},
                    message: 'File size exceeds 5 MB!',
                    success: false,
                },
                BAD_REQUEST,
            )
        }

        if (!userId) {
            return c.json(
                {
                    data: {},
                    message: 'Unauthorized!',
                    success: false,
                },
                BAD_REQUEST,
            )
        }

        const profilePictureUrl = await uploadToS3AndGetUrl(file)

        const [updatedUser] = await uploadProfilePicture(
            profilePictureUrl,
            userId,
        )
        if (!updatedUser) {
            return c.json(
                {
                    data: {},
                    message: 'User not found!',
                    success: false,
                },
                BAD_REQUEST,
            )
        }

        return c.json(
            {
                data: updatedUser,
                message: 'Profile photo uploaded successfully',
                success: true,
            },
            OK,
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return c.json(
                {
                    data: {},
                    message:
                        'An error occurred while uploading the profile picture',
                    success: false,
                    error: error.errors,
                },
                INTERNAL_SERVER_ERROR,
            )
        }
    }
}
