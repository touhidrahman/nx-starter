import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AuthStateService } from '@myorg/app-example-auth'
import { LoginFormService } from '@myorg/common-auth'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { toast } from 'ngx-sonner'

@Component({
    selector: 'app-page-login',
    standalone: true,
    imports: [
        ...SpartanModules,
        ReactiveFormsModule,
        RouterModule,
        HlmInputDirective,
    ],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
    providers: [LoginFormService],
})
export class PageLoginComponent {
    loginFormService = inject(LoginFormService)
    private authStateService = inject(AuthStateService)
    private router = inject(Router)

    isLoading = false

    login() {
        this.isLoading = true
        const formValues = this.loginFormService.getValue()

        this.authStateService
            .login(formValues.email, formValues.password)
            .subscribe({
                next: (res) => {
                    if (res?.user.id) {
                        this.isLoading = false
                        toast.success('Login Successfully')
                        this.router.navigate(['/home'])
                    }
                },
                error: () => {
                    toast.error('Login Failed')
                    this.isLoading = false
                },
            })
    }
}
