import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderPublicSecondaryComponent } from '../../../main/headers/components/header-public-secondary/header-public-secondary.component'

@Component({
    selector: 'app-page-lawyer-forgot-password',
    imports: [CommonModule, HeaderPublicSecondaryComponent],
    templateUrl: './page-lawyer-forgot-password.component.html',
    styleUrl: './page-lawyer-forgot-password.component.scss'
})
export class PageLawyerForgotPasswordComponent {}
