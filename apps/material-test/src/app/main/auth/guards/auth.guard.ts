import { inject } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from '@angular/router'
import { AuthStateService } from '../states/auth-state.service'

export function authGuardFn({
    redirectTo,
}: {
    redirectTo: any[]
}): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AuthStateService).isLoggedIn()
            ? true
            : inject(Router).createUrlTree(redirectTo, {
                  queryParams: { returnUrl: state.url },
              })
    }
}
