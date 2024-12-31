import { createRouter } from '../../core/create-app'
import { getMeHandler, getMeRoute } from './routes/get-me'
import {
    getMyProfilesHandler,
    getMyProfilesRoute,
} from './routes/get-my-profiles'
import { getUserHandler, getUserRoute } from './routes/get-user'
import { getUsersHandler, getUsersRoute } from './routes/get-users'
import { inviteUserHandler, inviteUserRoute } from './routes/invite-user'
import { updateUserHandler, updateUserRoute } from './routes/update-user'
import {
    updateUserProfileHandler,
    updateUserProfileRoute,
} from './routes/update-profile'
import {
    updateUserProfilePictureHandler,
    updateUserProfilePictureRoute,
} from './routes/upload-profile-picture'

export const userV1Routes = createRouter()
    .openapi(getMeRoute, getMeHandler)
    .openapi(getMyProfilesRoute, getMyProfilesHandler)
    .openapi(inviteUserRoute, inviteUserHandler)
    .openapi(getUsersRoute, getUsersHandler)
    .openapi(updateUserProfilePictureRoute, updateUserProfilePictureHandler)
    .openapi(updateUserProfileRoute, updateUserProfileHandler)
    .openapi(getUserRoute, getUserHandler)
    .openapi(updateUserRoute, updateUserHandler)
// .openapi(deleteUserRoute, deleteUserHandler)
