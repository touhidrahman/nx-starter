import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AlertService } from '../../main/alert/services/toast.service'
import { HeaderOneComponent } from '../../main/headers/header-one/header-one.component'
import { AuthApiService } from '@myorg/common-auth'
import { User } from '@myorg/app-example-models'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HeaderOneComponent,
    ],
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export default class ProfilePage implements OnInit {
    form = this.fb.nonNullable.group({
        currentPassword: [''],
        password: [''],
        passwordConfirmation: [''],
    })

    errors: string[] = []

    constructor(
        private auth: AuthApiService<User>,
        private fb: FormBuilder,
        private router: Router,
        private toast: AlertService,
    ) {}

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
