/* eslint-disable no-irregular-whitespace */
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { AuthApiService } from '@myorg/common-auth'
import { Router } from '@angular/router'
import { ApiResponse } from '@myorg/common-models'

@Component({
    selector: 'app-page-reset-password',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        HlmInputDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './page-reset-password.component.html',
    styleUrl: './page-reset-password.component.scss',
})
export class PageResetPasswordComponent implements OnInit {
    resetPasswordForm!: FormGroup

    constructor(
        private fb: FormBuilder,
        private authApiService: AuthApiService<any>,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.resetPasswordForm = this.fb.group(
            {
                currentPassword: ['', [Validators.required]],
                newPassword: [
                    '',
                    [Validators.required, Validators.minLength(6)],
                ],
                confirmPassword: ['', [Validators.required]],
            },
            { validator: this.passwordMatchValidator },
        )
    }

    passwordMatchValidator(form: FormGroup) {
        const newPassword = form.get('newPassword')
        const confirmPassword = form.get('confirmPassword')
        if (newPassword && confirmPassword) {
            return newPassword.value === confirmPassword.value
                ? null
                : { mismatch: true }
        }
        return null
    }

    onSubmit() {
        if (this.resetPasswordForm.valid) {
            const { currentPassword, newPassword, confirmPassword } =
                this.resetPasswordForm.value

            this.authApiService
                .changePassword(currentPassword, newPassword, confirmPassword)
                .subscribe({
                    next: (response: ApiResponse<boolean>) => {
                        if (response.data) {
                            // Password changed successfully
                            this.router.navigate(['/login']) // Redirect to login or another page
                        } else {
                            // Handle error
                            console.error('Password change failed')
                        }
                    },
                    error: (err) => {
                        // Handle error
                        console.error('Password change failed', err)
                    },
                })
        }
    }
}
