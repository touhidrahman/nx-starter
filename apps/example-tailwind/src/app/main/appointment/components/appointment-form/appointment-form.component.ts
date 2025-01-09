import { Component, inject, OnDestroy, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PrimeModules } from '@myorg/prime-modules'
import { AppointmentEditFormService } from '@myorg/app-example-forms'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { AppointmentListStateService } from '@myorg/app-example-states'

@Component({
    selector: 'app-appointment-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeModules],
    templateUrl: './appointment-form.component.html',
    styleUrl: './appointment-form.component.scss',
    providers: [AppointmentEditFormService],
})
export class AppointmentFormComponent implements OnDestroy {
    appointmentFormService = inject(AppointmentEditFormService)
    appointmentListStateService = inject(AppointmentListStateService)
    ref: DynamicDialogRef | undefined
    editMode = signal(false)

    save() {
        this.appointmentListStateService.saveAppointment()
        this.ref?.close()
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
