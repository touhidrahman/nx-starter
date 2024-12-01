import { Component, inject } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AlertService } from '@myorg/app-example-core'
import { AuthApiService } from '@myorg/common-auth'

@Component({
    selector: 'app-page-forgot-password',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    templateUrl: './page-forgot-password.component.html',
    styleUrl: './page-forgot-password.component.scss',
})
export class PageForgotPasswordComponent {
    private fb = inject(FormBuilder)
    private authApiService = inject<AuthApiService<any>>(AuthApiService)
    private router = inject(Router)
    private alertService = inject(AlertService)

    forgotPasswordForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    })
    error: string | null = null

    onSubmit(): void {
        this.error = null
        if (this.forgotPasswordForm.valid) {
            const email = this.forgotPasswordForm.value.email
            this.authApiService.forgotPassword(email).subscribe({
                next: (response) => {
                    if (response.data) {
                        this.alertService.success('Reset link sent successfully.')
                    } else {
                        this.alertService.error('Failed to send reset link.')
                        this.error = 'Failed to send reset link.'
                    }
                },
                error: (err) => {
                    console.error('Error sending reset link:', err)

                    this.alertService.error('Error sending reset link.')
                    this.error =
                        'An error occurred while sending the reset link.'
                },
            })
        }
    }
}
