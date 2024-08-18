import { Component, inject } from '@angular/core'

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
import { toast } from 'ngx-sonner'

@Component({
    selector: 'app-page-reset-password',
    standalone: true,
    imports: [...SpartanModules, HlmInputDirective, ReactiveFormsModule],
    templateUrl: './page-reset-password.component.html',
    styleUrls: ['./page-reset-password.component.scss'],
})
export class PageResetPasswordComponent {
    private fb = inject(FormBuilder)
    private authApiService = inject<AuthApiService<any>>(AuthApiService)
    private router = inject(Router)

    resetPasswordForm: FormGroup = this.fb.group({
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
    })

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
        // if (this.resetPasswordForm.valid) {
        //     const { currentPassword, newPassword, confirmPassword } =
        //         this.resetPasswordForm.value;
        //     this.authApiService
        //         .changePassword(currentPassword, newPassword, confirmPassword)
        //         .subscribe({
        //             next: (response: ApiResponse<boolean>) => {
        //                 if (response.data) {
        //                     // Show success toast
        //                     toast('Password changed successfully', {
        //                         description: 'You have successfully changed your password.',
        //                         action: {
        //                             label: 'Login',
        //                             onClick: () => this.router.navigate(['/login']),
        //                         }
        //                     });
        //                 } else {
        //                     // Show error toast
        //                     toast('Password change failed', {
        //                         description: 'Please try again.',
        //                     });
        //                 }
        //             },
        //             error: (err) => {
        //                 // Show error toast
        //                 toast('Password change failed', {
        //                     description: 'An error occurred. Please try again.',
        //                 });
        //                 console.error('Password change failed', err);
        //             },
        //         });
        // }
    }
}
