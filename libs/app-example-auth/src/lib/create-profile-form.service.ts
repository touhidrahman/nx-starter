import { inject, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class CreateProfileFormService {
    fb = inject(FormBuilder)
    createProfileForm: FormGroup

    constructor() {
        this.createProfileForm = this.fb.nonNullable.group({
            type: ['', Validators.required],
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

    controls(control: string) {
        return this.createProfileForm.get(control)
    }

    getValue() {
        return this.createProfileForm.value
    }
}
