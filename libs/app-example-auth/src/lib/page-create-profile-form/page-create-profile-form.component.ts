import { Component, inject, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthApiService } from '@myorg/common-auth'
import { AuthStateService } from '../auth-state.service'
import { GroupFormService } from '../group-form.service'

@Component({
    selector: 'myorg-page-create-profile-form',
    imports: [ReactiveFormsModule],
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

    profileType = this.activatedRoute.snapshot.params['profileType'] as
        | 'client'
        | 'vendor'

    submit() {
        if (this.groupFormService.form.invalid) {
            return
        }
        console.log(this.groupFormService.getValue())
        this.authApiService
            .createGroupAndProfile(
                this.groupFormService.getValue(),
                this.profileType,
            )
            .subscribe((res) => {
                this.router.navigate(['/profile-created'])
            })
    }
}
