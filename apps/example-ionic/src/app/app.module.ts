import { NgModule, inject, provideAppInitializer } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import {
    APP_EXAMPLE_ENVIRONMENT,
    appInitializerFactory,
} from '@myorg/app-example-core'
import { AuthStateService } from '@myorg/app-example-auth'
import {
    AUTH_API_URL,
    AuthApiService,
    TokenStorageService,
} from '@myorg/common-auth'
import { LocalStorageService } from '@myorg/common-services'
import { HttpClientModule } from '@angular/common/http'
import { environment } from '../environment/environment'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicModule.forRoot({}),
    ],
    providers: [
        { provide: APP_EXAMPLE_ENVIRONMENT, useValue: environment },
        { provide: AUTH_API_URL, useValue: environment.authApiUrl },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideAppInitializer(() => {
            const initializerFn = appInitializerFactory(
                inject(AuthStateService),
                inject(AuthApiService),
                inject(TokenStorageService),
                inject(LocalStorageService),
            )
            return initializerFn()
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
