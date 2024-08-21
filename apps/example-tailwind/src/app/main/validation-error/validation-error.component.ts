import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ERROR_MESSAGES } from './error.messages'

@Component({
    selector: 'app-validation-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validation-error.component.html',
    styleUrl: './validation-error.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorComponent {
    @Input() fieldControl!: FormControl | undefined

    errorMessages: string[] = []

    hasError(): boolean {
        this.errorMessages = []

        if (
            this.fieldControl !== null &&
            this.fieldControl !== undefined &&
            this.fieldControl.getError('messages') !== undefined
        ) {
            this.errorMessages = this.fieldControl.getError('messages')
            return true
        }

        if (this.fieldControl && this.fieldControl.errors) {
            Object.keys(this.fieldControl.errors).forEach((errorKey) => {
                const errorParam = this.fieldControl?.getError(errorKey)
                const errorMessage = ERROR_MESSAGES[errorKey](errorParam)
                this.errorMessages.push(errorMessage)
            })

            return (
                this.fieldControl.touched && this.fieldControl.errors !== null
            )
        }

        return false
    }
}
