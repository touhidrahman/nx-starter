import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AlertService } from '../../../main/alert/services/toast.service'
import { AuthApiService } from '@my-nx-starter/common-auth'
import { User } from '@my-nx-starter/app-example-models'

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
    templateUrl: './forgot-password.page.html',
    styleUrls: ['./forgot-password.page.scss'],
})
export default class ForgotPasswordPage {
    email = ''

    constructor(
        private authApiService: AuthApiService<User>,
        private toast: AlertService,
        private router: Router,
    ) {}

    submit() {
        this.authApiService.forgotPassword(this.email).subscribe({
            next: () => {
                this.toast.success('Success! Please check your email.')
                this.router.navigate(['/'])
            },
        })
    }
}
