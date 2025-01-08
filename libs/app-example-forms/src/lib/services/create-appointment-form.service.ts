import { inject, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class CreateAppointmentFormService {
    private fb = inject(FormBuilder)
    form: FormGroup = this.buildForm()

    buildForm(): FormGroup {
        return this.fb.nonNullable.group({
            date: ['', [Validators.required]],
            vendorUserId: ['', [Validators.required]],
            clientUserId: ['', [Validators.required]],
            startTimestamp: ['', [Validators.required]],
            endTimestamp: ['', [Validators.required]],
            description: ['', [Validators.required]],
            notesForVendor: ['', [Validators.required]],
            notesForClient: ['', [Validators.required]],
            groupId: ['', [Validators.required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.value
    }
}
