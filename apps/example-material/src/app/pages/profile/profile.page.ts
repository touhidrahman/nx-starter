import { Component, OnInit, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AlertService } from '../../main/alert/services/toast.service'
import { HeaderOneComponent } from '../../main/headers/header-one/header-one.component'
import { AuthApiService } from '@myorg/common-auth'
import { User } from '@myorg/app-example-models'

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule, HeaderOneComponent],
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export default class ProfilePage implements OnInit {
    private auth = inject<AuthApiService<User>>(AuthApiService)
    private fb = inject(FormBuilder)
    private router = inject(Router)
    private toast = inject(AlertService)

    form = this.fb.nonNullable.group({
        currentPassword: [''],
        password: [''],
        passwordConfirmation: [''],
    })

    errors: string[] = []

    ngOnInit(): void {
        void 0
    }

    submit(): void {
        this.errors = []
        const { currentPassword, password, passwordConfirmation } =
            this.form.value

        if (!currentPassword || !password || !passwordConfirmation) {
            this.errors.push('All fields are required')
            return
        }
        if (!password || password !== passwordConfirmation) {
            this.errors.push('Passwords do not match')
            return
        }
        this.auth
            .changePassword(currentPassword, password, passwordConfirmation)
            .subscribe({
                next: () => {
                    this.toast.success('Password changed successfully')
                    this.form.reset()
                },
                error: (err) => {
                    this.errors.push(err.error.message)
                },
            })
    }
}
