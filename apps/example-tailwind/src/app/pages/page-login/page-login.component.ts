import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { RouterModule } from '@angular/router'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { AuthStateService } from '@myorg/app-example-auth'
import { LoginFormService } from '@myorg/common-auth'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'app-page-login',
    standalone: true,
    imports: [
        CommonModule,
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
    constructor(
        public loginFormService: LoginFormService,
        private authStateService: AuthStateService,
    ) {}

    login() {
        const formValues = this.loginFormService.getValue()

        this.authStateService
            .login(formValues.email, formValues.password)
            .subscribe()
    }
}
