import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthApiService, ChangePasswordFormService } from '@myorg/common-auth'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { toInt } from 'radash'

@Component({
    selector: 'app-page-profile',
    standalone: true,
    imports: [
        CommonModule,
        ...SpartanModules,
        HlmInputDirective,
        ReactiveFormsModule,
    ],
    templateUrl: './page-profile.component.html',
    styleUrl: './page-profile.component.scss',
    providers: [ChangePasswordFormService],
})
export class PageProfileComponent implements OnInit {
    private authApiService = inject(AuthApiService)
    readonly changePasswordFormService = inject(ChangePasswordFormService)

    userId = 0

    getUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }

    ngOnInit(): void {
        const user = this.getUser()
        this.userId = user.id
    }

    onSubmit() {
        if (this.changePasswordFormService.form.invalid) {
            return
        }

        const { currentPassword, password, passwordConfirmation } =
            this.changePasswordFormService.getValue()

        const userId = toInt(this.userId)

        console.log(
            // currentPassword,
            // password,
            // passwordConfirmation,
            typeof userId,
        )

        this.authApiService
            .changePassword(userId, currentPassword, password)
            .subscribe({
                next: (response) => {
                    // console.log(response)
                },
                error: (error) => {
                    console.error('An error occurred:', error)
                },
            })
    }
}
