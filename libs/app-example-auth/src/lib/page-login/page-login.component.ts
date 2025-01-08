import { Component, inject, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { AuthStateService } from '../auth-state.service'
import { UserLevel } from '@myorg/app-example-models'
import { LoginFormService } from '@myorg/common-auth'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'myorg-page-login',
    imports: [...PrimeModules, ReactiveFormsModule, RouterModule],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
    providers: [LoginFormService],
})
export class PageLoginComponent implements OnInit {
    private authStateService = inject(AuthStateService)
    private activatedRoute = inject(ActivatedRoute)
    private router = inject(Router)
    private returnUrl = ''

    loginFormService = inject(LoginFormService)

    loading = false
    errors: string[] = []

    ngOnInit(): void {
        this.returnUrl =
            this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '/'

        if (this.authStateService.isLoggedIn())
            this.router.navigateByUrl(this.returnUrl)
    }

    submit(): void {
        if (this.loading) return

        if (this.loginFormService.loginForm.invalid) {
            this.errors.push('Invalid Credentials')
        }

        this.errors = []
        this.loading = true

        const { email, password } = this.loginFormService.getValue()
        this.authStateService.login(email, password).subscribe({
            next: (res) => {
                this.loading = false
                this.redirectAfterLogin()
            },
            error: (err) => {
                this.loading = false
                this.errors.push(err.error.message)
            },
        })
    }

    private redirectAfterLogin(): void {
        const { groupId, level } = this.authStateService.getState()
        if (!groupId && level !== UserLevel.Admin) {
            this.router.navigateByUrl('/create-profile')
            return
        }

        if (groupId && level === UserLevel.User) {
            this.router.navigateByUrl('/organization-list')
            return
        }

        this.router.navigateByUrl(this.returnUrl)
    }
}
