import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PrimeModules } from '@myorg/prime-modules'
import { AppointmentEditFormService } from '@myorg/app-example-forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AppointmentListStateService } from '@myorg/app-example-states'
import { AlertService } from '@myorg/app-example-core'

@Component({
    selector: 'app-appointment-form',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, PrimeModules],
    templateUrl: './appointment-form.component.html',
    styleUrl: './appointment-form.component.scss',
    providers: [AppointmentEditFormService],
})
export class AppointmentFormComponent implements OnInit, OnDestroy {
    appointmentFormService = inject(AppointmentEditFormService)
    appointmentListStateService = inject(AppointmentListStateService)
    config = inject(DynamicDialogConfig)
    ref = inject(DynamicDialogRef)
    alertService = inject(AlertService)
    editMode = signal(false)
    mode: 'create' | 'edit' = 'create'

    ngOnInit() {
        this.mode = this.config.data?.mode || 'create'
        if (this.mode === 'edit' && this.config.data.data) {
            this.appointmentFormService.form.patchValue(this.config.data.data)
        }
    }

    save() {
        this.appointmentFormService.save$().subscribe({
            next: (value) => {
                this.ref.close(value)
                this.alertService.success('Appointment created!')
            },
            error: (err) => {
                this.alertService.success(err.error.message)
            },
        })
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
