import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLinkActive, RouterModule } from '@angular/router'
import { ChangePasswordFormService } from '@myorg/common-auth'
import { userRoute, UserRoute } from './user-route-data'
import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { ChangeDetectionStrategy, inject, OnInit } from '@angular/core'
import { AlertService } from '@myorg/app-example-core'
import { AuthApiService } from '@myorg/common-auth'
import { ApiResponse } from '@myorg/common-models'
import { toInt } from 'radash'

interface User {
    firstName: string
    lastName: string
    email: string
    phone: number
    birthDate: Date
    streetNo: string
    houseNo: string
    division: string
    district: string
    postalCode: string
    taxId: string
}

@Component({
    selector: 'app-page-profile',
    imports: [
        CommonModule,
        RouterModule,
        RouterLinkActive,
        AvatarModule,
        CardModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        FormsModule,
    ],
    templateUrl: './page-profile.component.html',
    styleUrl: './page-profile.component.scss',
    providers: [ChangePasswordFormService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProfileComponent implements OnInit {
    userRoute: UserRoute[] = userRoute

    private authApiService = inject(AuthApiService)
    private alertService = inject(AlertService)
    readonly changePasswordFormService = inject(ChangePasswordFormService)

    userId = 0

    isPersonalInfoDisabled = true
    isAddressDisabled = true
    originalUserData: User

    user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: 1234567890,
        birthDate: new Date(1990, 0, 1),
        streetNo: '123',
        houseNo: 'wdet 12',
        division: 'Dhaka',
        district: 'Dhaka',
        postalCode: '1120',
        taxId: 'a-123',
    }

    constructor() {
        this.originalUserData = { ...this.user }
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
                        this.alertService.success(
                            `Password changed successfully`,
                        )
                    } else {
                        this.alertService.error(`${res.message}`)
                    }
                },
                error: () => {
                    this.alertService.error('password change failed')
                },
            })
    }

    enablePersonalInfoEdit() {
        this.isPersonalInfoDisabled = false
    }
    cancelPersonalInfoEdit() {
        this.isPersonalInfoDisabled = true
        this.user = { ...this.originalUserData }
    }

    //!to do : form type will be change later
    onSubmitUserPersonalInfo(form: any) {
        this.isPersonalInfoDisabled = true
        this.originalUserData = { ...form.value }
    }

    enableAddressEdit() {
        this.isAddressDisabled = false
    }

    cancelAddressEdit() {
        this.isAddressDisabled = true
        this.user = { ...this.originalUserData }
    }

    //!to do : form type will be change later
    onSubmitUserAddress(form: any) {
        this.isAddressDisabled = true
        this.originalUserData = { ...form.value }
    }

    getUser() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    }
}
