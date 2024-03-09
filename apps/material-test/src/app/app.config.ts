import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import {
    PreloadAllModules,
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router'
import { appRoutes } from './app.routes'
import {
    provideHttpClient,
    withXsrfConfiguration,
    withJsonpSupport,
    withInterceptors,
} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
    AUTH_API_URL,
    AuthHeaderInterceptorFn,
} from '@myorg/common-auth'
import { environment } from '../environment/environment'
import { APP_EXAMPLE_ENVIRONMENT } from '@myorg/app-example-core'

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: APP_EXAMPLE_ENVIRONMENT, useValue: environment },
        { provide: AUTH_API_URL, useValue: environment.authApiUrl },
        provideHttpClient(withXsrfConfiguration({}), withJsonpSupport()),
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            withRouterConfig({ onSameUrlNavigation: 'reload' }),
            withComponentInputBinding(),
            withPreloading(PreloadAllModules),
        ),
        importProvidersFrom(BrowserAnimationsModule),
    ],
}
