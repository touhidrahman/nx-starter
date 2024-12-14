import { createRouter } from '../../core/create-app'
import {
    changePasswordHandler,
    changePasswordRoute,
} from './routes/change-password'
import { loginHandler, loginRoute } from './routes/login'
import { registerHandler, registerRoute } from './routes/register'
import { verifyEmailHandler, verifyEmailRoute } from './routes/verify-email'
import {
    forgotPasswordRoute,
    forgotPasswordHandler,
} from './routes/forgot-password'
import {
    resetPasswordRoute,
    resetPasswordHandler,
} from './routes/reset-password'
import {
    createClientProfileHandler,
    createClientProfileRoute,
} from './routes/create-client-profile'
import {
    createVendorProfileHandler,
    createVendorProfileRoute,
} from './routes/create-vendor-profile'
import {
    setDefaulGroupRoute,
    setDefaultGroupHandler,
} from './routes/set-default-group-to-authUser'

export const authV1Routes = createRouter()
    .openapi(loginRoute, loginHandler)
    .openapi(registerRoute, registerHandler)
    .openapi(createClientProfileRoute, createClientProfileHandler)
    .openapi(createVendorProfileRoute, createVendorProfileHandler)
    .openapi(setDefaulGroupRoute, setDefaultGroupHandler)
    .openapi(changePasswordRoute, changePasswordHandler)
    .openapi(forgotPasswordRoute, forgotPasswordHandler)
    .openapi(resetPasswordRoute, resetPasswordHandler)
    .openapi(verifyEmailRoute, verifyEmailHandler)
