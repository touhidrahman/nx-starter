import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { AuthStateService } from '../auth-state.service'
import { PrimeModules } from '@myorg/prime-modules'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'myorg-page-profile-created',
    imports: [CommonModule, PrimeModules, RouterLink],
    templateUrl: './page-profile-created.component.html',
    styleUrl: './page-profile-created.component.scss',
})
export class PageProfileCreatedComponent {
    private authStateService = inject(AuthStateService)

    goToLogin() {
        this.authStateService.logout('/login')
    }
}
