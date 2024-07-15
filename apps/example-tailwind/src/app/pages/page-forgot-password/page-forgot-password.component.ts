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
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-page-forgot-password',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        HlmInputDirective,
        HlmCardDirective,
    ],
    templateUrl: './page-forgot-password.component.html',
    styleUrl: './page-forgot-password.component.scss',
})
export class PageForgotPasswordComponent implements OnInit {
    forgotPasswordForm!: FormGroup
    error: string | null = null

    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService<any>,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.forgotPasswordForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
        })
    }

    onSubmit(): void {
        this.error = null
        if (this.forgotPasswordForm.valid) {
            const email = this.forgotPasswordForm.value.email
            this.authApiService.forgotPassword(email).subscribe({
                next: (response) => {
                    if (response.data) {
                        alert('Reset link sent successfully.')
                        this.router.navigate(['/login'])
                    } else {
                        this.error = 'Failed to send reset link.'
                    }
                },
                error: (err) => {
                    console.error('Error sending reset link:', err)
                    this.error =
                        'An error occurred while sending the reset link.'
                },
            })
        }
    }
}
