import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { RegisterFormService } from '@myorg/common-auth'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-sign-up',
    imports: [...PrimeModules, RouterModule, ReactiveFormsModule],
    templateUrl: './page-sign-up.component.html',
    styleUrls: ['./page-sign-up.component.scss'],
    providers: [RegisterFormService],
})
export class PageSignUpComponent {
    private authStateService = inject(AuthStateService)
    private registerFormService = inject(RegisterFormService)
    private router = inject(Router)

    errors = signal<string[]>([])

    get signUpForm() {
        return this.registerFormService.form
    }

    register() {
        if (this.registerFormService.form.invalid) {
            return
        }

        const signupInput = this.registerFormService.getValue()

        this.authStateService.register(signupInput).subscribe({
            next: (response) => {
                this.router.navigate(['/account-created'])
            },
            error: (error) => {
                this.errors.set([error.error.message])
            },
        })
    }
}
