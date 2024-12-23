import { inject, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class GroupFormService {
    private fb = inject(FormBuilder)
    form: FormGroup = this.buildForm()

    buildForm(): FormGroup {
        return this.fb.nonNullable.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            address: [''],
            city: [''],
            country: [''],
            postCode: [''],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.value
    }
}
