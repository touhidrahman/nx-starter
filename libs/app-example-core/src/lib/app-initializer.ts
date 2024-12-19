import { inject } from '@angular/core'
import { AuthStateService } from '@myorg/app-example-auth'
import { catchError, of } from 'rxjs'

export const appInitializerFn = () => {
    const authStateService = inject(AuthStateService)
    return authStateService.refreshAccessToken().pipe(
        catchError((err) => {
            console.error('Error on provideAppInitializer', err)
            return of()
        }),
    )
}
