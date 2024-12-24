import { inject } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router'
import { AuthStateService } from './auth-state.service'

export function authGuardFn({
    redirectTo,
}: {
    redirectTo: any[]
}): CanActivateFn {
    return (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AuthStateService).isLoggedIn()
            ? true
            : inject(Router).createUrlTree(redirectTo, {
                  queryParams: { returnUrl: state.url },
              })
    }
}
