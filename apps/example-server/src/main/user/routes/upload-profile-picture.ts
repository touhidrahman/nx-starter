import { createRoute, z } from '@hono/zod-openapi'
import {
    OK,
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
} from 'stoker/http-status-codes'
import { AppRouteHandler } from '../../../core/core.type'
import { ApiResponse } from '../../../core/utils/api-response.util'
import { updateUserProfilePictureUrl } from '../user.service'
import { checkToken } from '../../auth/auth.middleware'
import { uploadToS3AndGetUrl } from '../../../core/third-party/s3.service'
import { jsonContent } from 'stoker/openapi/helpers'
import { zProfilePicture, zSelectUser } from '../user.schema'
import { zEmpty } from '../../../core/models/common.schema'

export const updateUserProfilePictureRoute = createRoute({
    path: '/v1/user/upload-profile-picture',
    method: 'post',
    tags: ['User'],
    middleware: [checkToken] as const,
    request: {
        body: jsonContent(zProfilePicture, 'Profile picture'),
    },
    responses: {
        [OK]: ApiResponse(zSelectUser, 'Profile picture updated successfully'),
        [BAD_REQUEST]: ApiResponse(zEmpty, 'Invalid file error'),
        [INTERNAL_SERVER_ERROR]: ApiResponse(zEmpty, 'Internal Server error'),
    },
})
export const updateUserProfilePictureHandler: AppRouteHandler<
    typeof updateUserProfilePictureRoute
> = async (c) => {
    const body = await c.req.parseBody({ all: true })
    const file = body['file'] as File
    const userPayload = await c.get('jwtPayload')
    const userId = userPayload?.userId

    try {
        const errors: string[] = []
        const allowedFormats = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 5 * 1024 * 1024

        if (!file) errors.push('No file provided')

        if (!allowedFormats.includes(file.type))
            errors.push('Invalid file type')
        if (file.size > MAX_FILE_SIZE) errors.push('File size exceeds limit')

        if (errors.length > 0)
            c.json(
                {
                    data: {},
                    message: 'File validation errors occured',
                    error: errors,
                    success: false,
                },
                BAD_REQUEST,
            )

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

        const [updatedUser] = await updateUserProfilePictureUrl(
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
                BAD_REQUEST,
            )
        }
        return c.json(
            {
                data: {},
                message:
                    'An error occurred while uploading the profile picture',
                success: false,
                error: error,
            },
            INTERNAL_SERVER_ERROR,
        )
    }
}
