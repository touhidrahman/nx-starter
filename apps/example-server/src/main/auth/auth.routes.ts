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

export const authV1Routes = createRouter()
// .openapi(loginRoute, loginHandler)
// .openapi(registerRoute, registerHandler)
// .openapi(verifyEmailRoute, verifyEmailHandler)
// .openapi(changePasswordRoute, changePasswordHandler)
// .openapi(forgotPasswordRoute, forgotPasswordHandler)
// .openapi(resetPasswordRoute, resetPasswordHandler)
