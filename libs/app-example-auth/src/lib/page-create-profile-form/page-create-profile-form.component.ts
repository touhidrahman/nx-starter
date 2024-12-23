import { Component, inject, input, OnInit } from '@angular/core'
import { AuthStateService } from '../auth-state.service'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { GroupFormService } from '../group-form.service'

@Component({
    selector: 'myorg-page-create-profile-form',
    imports: [ReactiveFormsModule],
    templateUrl: './page-create-profile-form.component.html',
    styleUrl: './page-create-profile-form.component.css',
    providers: [GroupFormService],
})
export class PageCreateProfileFormComponent implements OnInit {
    authStateService = inject(AuthStateService)
    groupFormService = inject(GroupFormService)

    profileType = input<'client' | 'vendor'>()

    ngOnInit(): void {
    }

    submit() {
    }
}
