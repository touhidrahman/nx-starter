import { inject, Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class CaseFormService {
    private fb = inject(FormBuilder)
    form: FormGroup = this.buildForm()

    buildForm(): FormGroup {
        return this.fb.nonNullable.group({
            number: ['', [Validators.required]],
            name: ['', [Validators.required]],
            defendant: ['', [Validators.required]],
            plaintiffName: ['', [Validators.required]],
            court: ['', [Validators.required]],
        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.value
    }
}
