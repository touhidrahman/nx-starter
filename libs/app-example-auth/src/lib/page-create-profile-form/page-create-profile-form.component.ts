import { Component, inject, input, OnInit } from '@angular/core'
import { AuthStateService } from '../auth-state.service'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { CreateProfileFormService } from '../create-profile-form.service'

@Component({
    selector: 'myorg-page-create-profile-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './page-create-profile-form.component.html',
    styleUrl: './page-create-profile-form.component.css',
    providers: [CreateProfileFormService],
})
export class PageCreateProfileFormComponent implements OnInit {
    profileType = input()
    authStateService = inject(AuthStateService)
    createProfileFormService = inject(CreateProfileFormService)
    fb = inject(FormBuilder)

    createProfileForm!: FormGroup

    ngOnInit(): void {
        this.initForm()
    }

    initForm() {
        this.createProfileForm = this.fb.nonNullable.group({
            type: [this.profileType(), Validators.required],
            status: ['', Validators.required],
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
            postCode: ['', [Validators.required]],
            ownerId: ['', [Validators.required]],
            verified: [false, [Validators.required]],
        })
    }

    submit() {
        console.log(this.createProfileForm.value)
    }
}
