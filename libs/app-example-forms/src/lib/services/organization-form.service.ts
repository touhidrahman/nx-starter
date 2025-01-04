import { inject, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class OrganizationFormService {
    private fb = inject(FormBuilder)
    form: FormGroup = this.buildForm()

    buildForm(): FormGroup {
        return this.fb.nonNullable.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            type: ['', [Validators.required]],
            status: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            address: ['', [Validators.required]],
            city: ['', [Validators.required]],
            country: ['', [Validators.required]],
            postCode: ['', [Validators.required]],
            verfied: ['', [Validators.required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.value
    }
}
