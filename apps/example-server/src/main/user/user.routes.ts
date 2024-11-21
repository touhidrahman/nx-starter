import { deleteUserRoute } from './routes/delete-user'
import { getMeRoute } from './routes/get-me'
import { getMyProfilesRoute } from './routes/get-my-profiles'
import { getUserRoute } from './routes/get-user'
import { getUsersRoute } from './routes/get-users'
import { inviteUserRoute } from './routes/invite-user'
import { updateUserRoute } from './routes/update-user'

export const userV1Routes = [
    getMeRoute,
    getMyProfilesRoute,
    // inviteUserRoute,
    // getUsersRoute,
    // getUserRoute,
    // updateUserRoute,
    // deleteUserRoute,
]
