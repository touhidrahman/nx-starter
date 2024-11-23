import { Injectable } from '@angular/core'
import {
    AbstractControl,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { SignupInput } from '../models/signup-input'

type RegisterForm = {
    [field in keyof SignupInput]: FormControl<SignupInput[field]>
}

const RegexEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Regex8CharsSmallCapitalDigitSpecial =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{6,}$/

@Injectable()
export class RegisterFormService {
    form: FormGroup<RegisterForm>

    constructor(private fb: NonNullableFormBuilder) {
        const { required, minLength, maxLength, pattern, email } = Validators

        this.form = this.fb.group(
            {
                email: ['', [required, email, pattern(RegexEmailPattern)]],
                password: [
                    '',
                    [
                        required,
                        minLength(8),
                        maxLength(32),
                        pattern(Regex8CharsSmallCapitalDigitSpecial),
                    ],
                ],
                passwordConfirmation: ['', required],
                firstName: ['', required],
                lastName: ['', required],
            },
            { validators: [confirmPasswordValidator] },
        )
    }

    getValue(): SignupInput {
        return this.form.value as SignupInput
    }
}

const confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    return control.value.password === control.value.passwordConfirmation
        ? null
        : { passwordNotMatched: true }
}
