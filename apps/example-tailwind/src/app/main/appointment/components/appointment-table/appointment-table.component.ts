import { Component, inject, input, model, OnDestroy } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { PrimeModules } from '@myorg/prime-modules'
import { Appointment } from '@myorg/app-example-models'
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component'
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component'
import { AppointmentListStateService } from '@myorg/app-example-states'
import { AppointmentApiService } from '@myorg/app-example-api-services'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
    selector: 'app-appointment-table',
    imports: [PrimeModules, AsyncPipe],
    templateUrl: './appointment-table.component.html',
    styleUrl: './appointment-table.component.scss',
    providers: [AppointmentListStateService],
})
export class AppointmentTableComponent implements OnDestroy {
    appointmentListStateService = inject(AppointmentListStateService)
    appointmentApiService = inject(AppointmentApiService)
    ref = inject(DynamicDialogRef)
    appointments = input<Appointment[]>([])
    editMode = model(false)
    dialogService = inject(DialogService)

    show() {
        this.ref = this.dialogService.open(AppointmentCardComponent, {
            header: 'Appointment',
            width: '50vw',
            closable: true,
        })
    }
    onEdit(mode: 'create' | 'edit', data: Appointment) {
        this.ref = this.dialogService.open(AppointmentFormComponent, {
            header: 'Update Appointment',
            data: {
                mode,
                data,
            },
            closable: true,
            position: 'top',
            width: '50vw',
        })

        this.ref.onClose.subscribe((data) => {
            const { appointments } = this.appointmentListStateService.getState()
            if (mode === 'edit' && data) {
                this.appointmentListStateService.setState({
                    appointments: [
                        ...appointments.filter((e) => e.id !== data.id),
                        data,
                    ],
                })
            }
        })
    }

    delete(id: string) {
        this.appointmentApiService.delete(id)
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
