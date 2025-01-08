import { CanMatchFn, Router } from '@angular/router'
import { AuthStateService } from './auth-state.service'
import { UserLevel } from '@myorg/app-example-models'
import { inject } from '@angular/core'

export function userLevelGuardFn(allowedLevels: UserLevel[]): CanMatchFn {
    return (route, segments) => {
        const authStateService = inject(AuthStateService)
        const router = inject(Router)
        const userLevel = authStateService.getUserLevel()

        if (userLevel !== null && allowedLevels.includes(userLevel)) {
            return true
        }

        const currentUrl = segments.map((segment) => segment.path).join('/')
        return router.createUrlTree(['/access-denied'], {
            queryParams: { returnUrl: currentUrl },
        })
    }
}
