import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common'
import {
    provideHttpClient,
    withInterceptors,
    withInterceptorsFromDi,
    withJsonpSupport,
    withXsrfConfiguration,
} from '@angular/common/http'
import {
    APP_INITIALIZER,
    ApplicationConfig,
    importProvidersFrom,
} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import {
    PreloadAllModules,
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import {
    APP_EXAMPLE_ENVIRONMENT,
    appInitializerFactory,
} from '@myorg/app-example-core'
import {
    AUTH_API_URL,
    AuthApiService,
    AuthHeaderInterceptorFn,
    TokenStorageService,
} from '@myorg/common-auth'
import { LocalStorageService } from '@myorg/common-services'
import { LucideAngularModule, icons } from 'lucide-angular'
import { environment } from '../environment/environment'
import { appRoutes } from './app.routes'

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: APP_EXAMPLE_ENVIRONMENT, useValue: environment },
        { provide: AUTH_API_URL, useValue: environment.authApiUrl },
        provideRouter(
            appRoutes,
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            withRouterConfig({ onSameUrlNavigation: 'reload' }),
            withComponentInputBinding(),
            withPreloading(PreloadAllModules),
        ),
        provideHttpClient(
            withXsrfConfiguration({}),
            withJsonpSupport(),
            withInterceptors([AuthHeaderInterceptorFn]),
            withInterceptorsFromDi(),
        ),
        importProvidersFrom(LucideAngularModule.pick(icons)),
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            multi: true,
            deps: [
                AuthStateService,
                AuthApiService,
                TokenStorageService,
                LocalStorageService,
            ],
        },
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: { timezone: 'UTC', dateFormat: 'shortDate' },
        },
    ],
}
