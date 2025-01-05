import { inject } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router'
import { AuthStateService } from './auth-state.service'

export function authGuard({ redirectTo }: { redirectTo: string[] }): CanActivateFn {
    return (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AuthStateService).isLoggedIn()
            ? true
            : inject(Router).createUrlTree(redirectTo, {
                  queryParams: { returnUrl: state.url },
              })
    }
}

