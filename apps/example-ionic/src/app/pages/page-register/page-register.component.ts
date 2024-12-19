import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import {
    AuthApiService,
    RegisterFormService,
    SignupInput,
} from '@myorg/common-auth'

@Component({
    selector: 'myorg-page-register',
    imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
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
