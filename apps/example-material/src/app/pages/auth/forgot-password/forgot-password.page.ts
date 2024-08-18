import { Component, inject } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AlertService } from '../../../main/alert/services/toast.service'
import { AuthApiService } from '@myorg/common-auth'
import { User } from '@myorg/app-example-models'

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterModule],
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export default class ForgotPasswordPage {
    private authApiService = inject<AuthApiService<User>>(AuthApiService)
    private toast = inject(AlertService)
    private router = inject(Router)

    email = ''

    submit() {
        this.authApiService.forgotPassword(this.email).subscribe({
            next: () => {
                this.toast.success('Success! Please check your email.')
                this.router.navigate(['/'])
            },
        })
    }
}
