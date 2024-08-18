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

@Component({
    selector: 'app-page-sign-up',
    standalone: true,
    imports: [
        ...SpartanModules,
        RouterModule,
        ReactiveFormsModule,
        HlmInputDirective,
    ],
    templateUrl: './page-sign-up.component.html',
    styleUrls: ['./page-sign-up.component.scss'],
    providers: [RegisterFormService],
})
export class PageSignUpComponent {
    registerFormService = inject(RegisterFormService)
    private authApiService = inject<AuthApiService<any>>(AuthApiService)
    private router = inject(Router)

    signup() {
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

        this.authApiService.adminRegister(signupInput).subscribe({
            next: (response) => {
                if (response.message === 'Account created') {
                    this.router.navigate(['/account-created'])
                } else {
                    console.error('Registration failed:', response.error)
                }
            },
            error: (error) => {
                console.error('An error occurred:', error)
            },
        })
    }
}
