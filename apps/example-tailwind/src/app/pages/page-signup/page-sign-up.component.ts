import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import {
    AuthApiService,
    RegisterFormService,
    SignupInput,
} from '@myorg/common-auth'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { toast } from 'ngx-sonner'
import { ValidationErrorComponent } from '../../main/validation-error/validation-error.component'

@Component({
    selector: 'app-page-sign-up',
    standalone: true,
    imports: [
        ...SpartanModules,
        RouterModule,
        ReactiveFormsModule,
        HlmInputDirective,
        ValidationErrorComponent,
    ],
    templateUrl: './page-sign-up.component.html',
    styleUrls: ['./page-sign-up.component.scss'],
    providers: [RegisterFormService],
})
export class PageSignUpComponent {
    registerFormService = inject(RegisterFormService)
    private authApiService = inject<AuthApiService<any>>(AuthApiService)
    private router = inject(Router)
    isLoading = false

    signup() {
        this.isLoading = true
        if (this.registerFormService.form.invalid) {
            return
        }

        const formValues = this.registerFormService.getValue()
        const signupInput: SignupInput = {
            email: formValues.email,
            password: formValues.password,
            passwordConfirmation: formValues.passwordConfirmation,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
        }

        this.authApiService.register(signupInput).subscribe({
            next: (response) => {
                if (response.message === 'Account created') {
                    this.isLoading = false
                    this.router.navigate(['/account-created'])
                } else {
                    this.isLoading = false
                    toast.error('Sing Up failed')
                }
            },
            error: () => {
                this.isLoading = false
                toast.error('Sing Up failed')
            },
        })
    }
}
