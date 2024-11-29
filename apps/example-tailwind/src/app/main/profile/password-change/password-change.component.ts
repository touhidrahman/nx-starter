import { CommonModule } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthApiService, ChangePasswordFormService } from '@myorg/common-auth'
import { ApiResponse } from '@myorg/common-models'
import { toast } from 'ngx-sonner'
import { toInt } from 'radash'

@Component({
    selector: 'app-password-change',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './password-change.component.html',
    styleUrl: './password-change.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ChangePasswordFormService],
})
export class PasswordChangeComponent implements OnInit {
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

        const { currentPassword, password } =
            this.changePasswordFormService.getValue()

        const userId = toInt(this.userId)

        this.authApiService
            .changePassword(userId, currentPassword, password)
            .subscribe({
                next: (res: ApiResponse<boolean>) => {
                    if (res.data == true) {
                        toast.message(`Password changed successful`)
                    } else {
                        toast.error(`${res.message}`)
                    }
                },
                error: () => {
                    toast.error('password change failed')
                },
            })
    }
}
