import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PrimeModules } from '@myorg/prime-modules'
import { CreateAppointmentFormService } from '@myorg/app-example-forms'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
    selector: 'app-appointment-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeModules],
    templateUrl: './appointment-form.component.html',
    styleUrl: './appointment-form.component.scss',
    providers: [CreateAppointmentFormService],
})
export class AppointmentFormComponent {
    appointmentFormService = inject(CreateAppointmentFormService)
    ref: DynamicDialogRef | undefined
    editMode = signal(false)

    save() {}
    cancel() {}
}
