import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'
import { LoginFormService } from '@myorg/common-auth'
import { AuthStateService } from '@myorg/app-example-auth'
import { ReactiveFormsModule } from '@angular/forms'

@Component({
    selector: 'myorg-page-login',
    imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
    providers: [LoginFormService]
})
export class PageLoginComponent {
    loginFormService = inject(LoginFormService)
    private authStateService = inject(AuthStateService)

    login() {
        const formValues = this.loginFormService.getValue()

        this.authStateService
            .login(formValues.email, formValues.password)
            .subscribe()
    }
}
