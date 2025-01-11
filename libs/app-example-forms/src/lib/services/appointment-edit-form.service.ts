import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AbstractFormService } from '@myorg/common-services'
import { Appointment } from '@myorg/app-example-models'
import { AppointmentApiService } from '@myorg/app-example-api-services'

@Injectable()
export class AppointmentEditFormService extends AbstractFormService<Appointment> {
    override form: FormGroup

    constructor(
        protected override fb: FormBuilder,
        protected appointmentApiService: AppointmentApiService,
    ) {
        super(fb, appointmentApiService)
        this.form = this.buildForm()
    }

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
