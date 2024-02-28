import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { LucideAngularModule, icons } from 'lucide-angular'
import { NgxSmartModalModule } from 'ngx-smart-modal'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes),
        importProvidersFrom(LucideAngularModule.pick(icons)),
        importProvidersFrom(NgxSmartModalModule.forRoot()),
    ],
}
