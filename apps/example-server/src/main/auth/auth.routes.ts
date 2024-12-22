import { createRouter } from '../../core/create-app'
import {
    changePasswordHandler,
    changePasswordRoute,
} from './routes/change-password'
import {
    createProfileHandler,
    createProfileRoute,
} from './routes/create-profile'
import {
    forgotPasswordHandler,
    forgotPasswordRoute,
} from './routes/forgot-password'
import { loginHandler, loginRoute } from './routes/login'
import { registerHandler, registerRoute } from './routes/register'
import {
    resetPasswordHandler,
    resetPasswordRoute,
} from './routes/reset-password'
import {
    setDefaulGroupRoute,
    setDefaultGroupHandler,
} from './routes/set-default-group-to-authUser'
import { verifyEmailHandler, verifyEmailRoute } from './routes/verify-email'

export const authV1Routes = createRouter()
    .openapi(loginRoute, loginHandler)
    .openapi(registerRoute, registerHandler)
    .openapi(createProfileRoute, createProfileHandler)
    .openapi(setDefaulGroupRoute, setDefaultGroupHandler)
    .openapi(changePasswordRoute, changePasswordHandler)
    .openapi(forgotPasswordRoute, forgotPasswordHandler)
    .openapi(resetPasswordRoute, resetPasswordHandler)
    .openapi(verifyEmailRoute, verifyEmailHandler)
