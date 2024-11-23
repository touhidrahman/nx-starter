import { Injectable } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginInput } from '../models/login-input'

@Injectable()
export class LoginFormService {
    loginForm: FormGroup

    get emailControl() {
        return this.loginForm.get('email')
    }

    get passwordControl() {
        return this.loginForm.get('password')
    }

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.nonNullable.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }

    getValue(): LoginInput {
        const { email, password } = this.loginForm.value
        return { email, password }
    }
}
