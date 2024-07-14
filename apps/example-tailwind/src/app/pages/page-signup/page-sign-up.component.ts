import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { Router, RouterModule } from '@angular/router'
import {
    AuthApiService,
    RegisterFormService,
    SignupInput,
} from '@myorg/common-auth'
import { ReactiveFormsModule } from '@angular/forms'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

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
    providers: [RegisterFormService],
})
export class PageSignUpComponent {
    constructor(
        public registerFormService: RegisterFormService,
        private authApiService: AuthApiService<any>,
        private route: Router,
    ) {}
    signup() {
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
                if (response.message==="Account created") {
                    this.route.navigate(["/account-created"])
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
