import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { AuthStateService } from '../auth-state.service'

@Component({
    selector: 'myorg-page-profile-created',
    imports: [CommonModule],
    templateUrl: './page-profile-created.component.html',
    styleUrl: './page-profile-created.component.scss',
})
export class PageProfileCreatedComponent {
    private authStateService = inject(AuthStateService)

    goToLogin() {
        this.authStateService.logout('/login')
    }
}
