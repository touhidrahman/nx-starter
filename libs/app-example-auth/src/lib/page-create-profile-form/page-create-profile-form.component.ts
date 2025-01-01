import { Component, inject } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthApiService } from '@myorg/common-auth'
import { AuthStateService } from '../auth-state.service'
import { GroupFormService } from '../group-form.service'
import { JsonPipe } from '@angular/common'

@Component({
    selector: 'myorg-page-create-profile-form',
    imports: [ReactiveFormsModule, JsonPipe],
    templateUrl: './page-create-profile-form.component.html',
    styleUrl: './page-create-profile-form.component.css',
    providers: [GroupFormService],
})
export class PageCreateProfileFormComponent {
    private authApiService = inject(AuthApiService)
    private activatedRoute = inject(ActivatedRoute)
    private router = inject(Router)
    authStateService = inject(AuthStateService)
    groupFormService = inject(GroupFormService)

    error = ''

    isLoading = false

    profileType = this.activatedRoute.snapshot.params['profileType'] as
        | 'client'
        | 'vendor'

    submit() {
        this.isLoading = true
        if (this.groupFormService.form.invalid) {
            this.isLoading = false
            return
        }
        console.log('form value', this.groupFormService.getValue())
        this.authApiService
            .createGroupAndProfile(
                this.groupFormService.getValue(),
                this.profileType,
            )
            .subscribe({
                next: () => {
                    this.isLoading = false
                    this.router.navigate(['/profile-created'])
                },
                error: (error) => {
                    this.isLoading = false
                    this.error = error.error.message
                    console.log(error.error.message)
                },
            })
    }
}
