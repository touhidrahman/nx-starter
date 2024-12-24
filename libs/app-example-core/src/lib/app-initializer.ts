import { inject } from '@angular/core'
import { AuthStateService } from '@myorg/app-example-auth'

export const appInitializerFn = () => {
    const authStateService = inject(AuthStateService)
    console.info('App Initializer')
    return authStateService.initAuthFromStorage()
}
