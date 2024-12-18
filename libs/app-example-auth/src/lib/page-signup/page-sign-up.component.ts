import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { RegisterFormService, SignupInput } from '@myorg/common-auth'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-sign-up',
    standalone: true,
    imports: [...PrimeModules, RouterModule, ReactiveFormsModule],
    templateUrl: './page-sign-up.component.html',
    styleUrls: ['./page-sign-up.component.scss'],
    providers: [RegisterFormService],
})
export class PageSignUpComponent {
    private authStateService = inject(AuthStateService)
    private registerFormService = inject(RegisterFormService)
    private router = inject(Router)

    get signUpForm() {
        return this.registerFormService.form
    }

    register() {
        if (this.registerFormService.form.invalid) {
            return
        }

        const formValues = this.registerFormService.getValue()
        const signupInput: SignupInput = {
            email: formValues.email,
            password: formValues.password,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
        }

        this.authStateService.register(signupInput).subscribe({
            next: (response) => {
                this.router.navigate(['/account-created'])
            },
            error: (error) => {
                console.error('An error occurred:', error)
            },
        })
    }
}
