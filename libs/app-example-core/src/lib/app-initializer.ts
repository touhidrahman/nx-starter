import { AuthStateService } from '@my-nx-starter/app-example-auth'
import { Observable, catchError, of } from 'rxjs'

export function appInitializerFactory(
    authStateService: AuthStateService,
): () => Observable<any> {
    return () =>
        authStateService.refreshAccessToken().pipe(
            catchError((err) => {
                console.error('Error on APP_INIIT', err)

                return of()
            }),
        )
}
