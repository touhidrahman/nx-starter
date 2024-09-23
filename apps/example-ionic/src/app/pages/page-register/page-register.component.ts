import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { Router, RouterModule } from '@angular/router'
import {
    AuthApiService,
    RegisterFormService,
    SignupInput,
} from '@myorg/common-auth'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Component({
    selector: 'myorg-page-register',
    standalone: true,
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    templateUrl: './page-register.component.html',
    styleUrl: './page-register.component.scss',
    providers: [RegisterFormService],
})
export class PageRegisterComponent {
    registerFormService = inject(RegisterFormService)
    private authApiService = inject<AuthApiService<any>>(AuthApiService)
    private router = inject(Router)

    constructor(private http: HttpClient) {}

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

        this.authApiService.register(signupInput).subscribe({
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
