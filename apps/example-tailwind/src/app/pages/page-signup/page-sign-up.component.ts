import { Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { RouterModule } from '@angular/router'
import {
    AuthApiService,
    RegisterFormService,
    SignupInput,
} from '@myorg/common-auth'
import { ReactiveFormsModule } from '@angular/forms'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { Router } from '@angular/router'

@Component({
    selector: 'app-page-sign-up',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        RouterModule,
        ReactiveFormsModule,
        HlmInputDirective,
    ],
    templateUrl: './page-sign-up.component.html',
    styleUrls: ['./page-sign-up.component.scss'],
    providers: [RegisterFormService, AuthApiService],
})
export class PageSignUpComponent {
    errorMessage: string | null = null

    constructor(
        public registerFormService: RegisterFormService,
        private authApiService: AuthApiService<any>,
        private router: Router,
    ) {}

    onSubmit(): void {
        if (this.registerFormService.form.invalid) {
            return
        }

        const signupData: SignupInput = this.registerFormService.getValue()

        this.authApiService.register(signupData).subscribe({
            next: (response) => {
                if (response.data) {
                    this.router.navigate(['/login'])
                } else {
                    this.errorMessage =
                        response.message || 'Registration failed'
                }
            },
            error: (error) => {
                this.errorMessage = error.error.message || 'An error occurred'
            },
        })
    }
}
