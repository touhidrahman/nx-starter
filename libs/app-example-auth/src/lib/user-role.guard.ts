import { inject } from '@angular/core';
import {
    CanMatchFn,
    Router,
} from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { UserRole } from '@myorg/app-example-models';

export const userRoleGuard: CanMatchFn = () => {
    const authStateService = inject(AuthStateService);
    const router = inject(Router);

    const userRole = authStateService.getUserRole();
    const groupId = authStateService.getGroupId();

    if (userRole !== UserRole.Admin && groupId) {
        return true;
    }

    return router.createUrlTree(['/access-denied']);
};