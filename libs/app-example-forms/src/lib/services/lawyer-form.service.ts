import { Injectable } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";


@Injectable()
export class LawyerFormService {
    form: FormGroup
    constructor(private fb: NonNullableFormBuilder) {
        const { required, email } = Validators

        this.form = this.fb.group({
            name: ['', [required]],
            email: ['', [required, email]],
            phoneNumber: ['', [required]],
            instituteName: ['', [required]],
            lawyerType: ['', [required]],
            practiceStartYear: [0, [required]],
            rating: [0, [required]],
            website: [''],
            businessHours: [''],
            institutionId: [''],
            latitude: [0],
            longitude: [0],
            address: ['', [required]],
            city: ['', [required]],
            district: ['', [required]],
            postCode: ['', [required]],
            interestedArea: [''],
            description: [''],
            profileImageUrl: [''],
            coverImageUrl: [''],
            sponsoredUntil: [null],
            sponsored: [false],

        })
    }

    controls(control: string) {
        return this.form.get(control)
    }

    getValue() {
        return this.form.getRawValue()
    }

}