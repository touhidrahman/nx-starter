import { Component, inject, signal } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '../auth-state.service'
import { RegisterFormService } from '@myorg/common-auth'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'myorg-page-sign-up',
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
    isLoading = signal(false)

    get signUpForm() {
        return this.registerFormService.form
    }

    register() {
        this.isLoading.set(true)
        if (this.registerFormService.form.invalid) {
            this.isLoading.set(false)
            return
        }

        const signupInput = this.registerFormService.getValue()

        this.authStateService.register(signupInput).subscribe({
            next: () => {
                this.isLoading.set(false)
                this.router.navigate(['/account-created'])
            },
            error: (error) => {
                this.isLoading.set(false)
                this.errors.set([error.error.message])
            },
        })
    }
}
