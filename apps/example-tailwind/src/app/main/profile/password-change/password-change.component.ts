import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AlertService } from '@myorg/app-example-core'
import { AuthApiService, ChangePasswordFormService } from '@myorg/common-auth'
import { ApiResponse } from '@myorg/common-models'
import { toInt } from 'radash'

@Component({
    selector: 'app-password-change',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './password-change.component.html',
    styleUrl: './password-change.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChangePasswordFormService]
})
export class PasswordChangeComponent implements OnInit {
    private authApiService = inject(AuthApiService)
    private alertService = inject(AlertService)
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

        const { currentPassword, password } =
            this.changePasswordFormService.getValue()

        const userId = toInt(this.userId)

        this.authApiService
            .changePassword(userId, currentPassword, password)
            .subscribe({
                next: (res: ApiResponse<boolean>) => {
                    if (res.data == true) {
                        this.alertService.success(`Password changed successfully`)
                    } else {
                        this.alertService.error(`${res.message}`)
                    }
                },
                error: () => {
                    this.alertService.error('password change failed')
                },
            })
    }
}
