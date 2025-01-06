import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common'
import {
    provideHttpClient,
    withInterceptors,
    withInterceptorsFromDi,
    withJsonpSupport,
    withXsrfConfiguration,
} from '@angular/common/http'
import {
    ApplicationConfig,
    importProvidersFrom,
    inject,
    provideAppInitializer,
} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {
    PreloadAllModules,
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
    withPreloading,
    withRouterConfig,
} from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { APP_EXAMPLE_ENVIRONMENT } from '@myorg/app-example-core'
import {
    AUTH_API_URL,
    AuthApiService,
    AuthHeaderInterceptorFn,
    TokenStorageService,
} from '@myorg/common-auth'
import { LocalStorageService } from '@myorg/common-services'
import Aura from '@primeng/themes/aura'
import { ConfirmationService, MessageService } from 'primeng/api'
import { providePrimeNG } from 'primeng/config'
import { DialogService } from 'primeng/dynamicdialog'
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
        importProvidersFrom(BrowserModule),
        // provideAppInitializer(() => {
        //     const initializerFn = appInitializerFactory(
        //         inject(AuthStateService),
        //         inject(AuthApiService),
        //         inject(TokenStorageService),
        //         inject(LocalStorageService),
        //     )
        //     return initializerFn()
        // }),
        {
            provide: DATE_PIPE_DEFAULT_OPTIONS,
            useValue: { timezone: 'UTC', dateFormat: 'shortDate' },
        },
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.dark',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities',
                    },
                },
            },
        }),
        MessageService,
        ConfirmationService,
        DialogService,
    ],
}
