import { provideHttpClient } from '@angular/common/http'
import { NgModule, provideAppInitializer } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import {
    APP_EXAMPLE_ENVIRONMENT,
    appInitializerFn,
} from '@myorg/app-example-core'
import { AUTH_API_URL } from '@myorg/common-auth'
import { environment } from '../environment/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicModule.forRoot({}),
    ],
    providers: [
        { provide: APP_EXAMPLE_ENVIRONMENT, useValue: environment },
        { provide: AUTH_API_URL, useValue: environment.authApiUrl },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideAppInitializer(appInitializerFn),
        provideHttpClient(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
