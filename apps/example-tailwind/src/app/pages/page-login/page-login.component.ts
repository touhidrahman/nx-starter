import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AuthApiService, LoginFormService, LoginResponse } from '@myorg/common-auth'
import { ApiResponse } from '@myorg/common-models'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

@Component({
    selector: 'app-page-login',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        RouterModule,
        HlmInputDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
    providers: [LoginFormService],
})
export class PageLoginComponent {
    constructor(
        public loginFormService: LoginFormService,
        private authApiService: AuthApiService<any> // Inject AuthApiService
    ) {}

    login() {
        const formValues = this.loginFormService.getValue();
        console.log(formValues);

        this.authApiService.login(formValues.email, formValues.password).subscribe({
            next: (response: ApiResponse<LoginResponse<any>>) => {
                if (response.data) {
                    console.log('Login successful', response.data);
                    // Handle successful login, e.g., navigate to another page or store user data
                } else {
                    console.log('Login failed', response.message);
                    // Handle login failure, e.g., show error message to user
                }
            },
            error: (err) => {
                console.error('Login error', err);
                // Handle HTTP error
            }
        });
    }
}

