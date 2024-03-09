import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthStateService } from '../states/auth-state.service'

/**
 * Checks whether user is admin or not
 * @returns
 */
export const adminGuardFn = () => {
    const router = inject(Router)
    const authService = inject(AuthStateService)
    if (authService.isAdmin()) return true
    router.navigate(['login'])
    return false
}
