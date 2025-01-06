import { Injectable } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";


@Injectable()
export class LawyerFormService {
    form: FormGroup
    constructor(private fb: NonNullableFormBuilder) {
        const { required, email } = Validators

        this.form = this.fb.group({
            name: ['', [required]],
            instituteName: ['', [required]],
            lawyerType: ['', [required]],
            practiceStartYear: [0, [required]],
            phoneNumber: ['', [required]],
            email: ['', [required, email]],
            profileImageUrl: [''],
            coverImageUrl: [''],
            description: [''],
            rating: [0, [required]],
            address: ['', [required]],
            city: ['', [required]],
            district: ['', [required]],
            postCode: ['', [required]],
            website: [''],
            businessHours: [''],
            sponsored: [false],
            sponsoredUntil: [null],
            interestedArea: [''],
            institutionId: [''],
            latitude: [0],
            longitude: [0],

        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }

}