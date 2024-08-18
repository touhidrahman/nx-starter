import { Component, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmCardDirective } from '@spartan-ng/ui-card-helm'
import { AuthApiService } from '@myorg/common-auth'

import { toast } from 'ngx-sonner'

@Component({
    selector: 'app-page-forgot-password',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterModule,
        HlmInputDirective,
        HlmCardDirective,
    ],
    templateUrl: './page-forgot-password.component.html',
    styleUrl: './page-forgot-password.component.scss',
})
export class PageForgotPasswordComponent {
    forgotPasswordForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    })
    error: string | null = null

    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService<any>,
        private router: Router,
    ) {}

    onSubmit(): void {
        this.error = null
        if (this.forgotPasswordForm.valid) {
            const email = this.forgotPasswordForm.value.email
            this.authApiService.forgotPassword(email).subscribe({
                next: (response) => {
                    if (response.data) {
                        toast('Reset link sent successfully.')
                    } else {
                        toast('Failed to send reset link.', {
                            description: 'Please try again later.',
                        })
                        this.error = 'Failed to send reset link.'
                    }
                },
                error: (err) => {
                    console.error('Error sending reset link:', err)

                    toast('Error sending reset link.', {
                        description:
                            'An error occurred while sending the reset link. Please try again later.',
                    })
                    this.error =
                        'An error occurred while sending the reset link.'
                },
            })
        }
    }
}
