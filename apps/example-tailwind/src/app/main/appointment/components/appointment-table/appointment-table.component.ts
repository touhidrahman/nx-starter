import { Component, inject, input, model } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { PrimeModules } from '@myorg/prime-modules'
import { Appointment } from '@myorg/app-example-models'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component'
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component'
import { AppointmentListStateService } from '@myorg/app-example-states'
import { AppointmentApiService } from '@myorg/app-example-api-services'

@Component({
    selector: 'app-appointment-table',
    imports: [PrimeModules, AsyncPipe],
    templateUrl: './appointment-table.component.html',
    styleUrl: './appointment-table.component.scss',
    providers: [AppointmentListStateService],
})
export class AppointmentTableComponent {
    appointmentListStateService = inject(AppointmentListStateService)
    appointmentApiService = inject(AppointmentApiService)
    appointments = input<Appointment[]>([])
    editMode = model(false)
    dialogService = inject(DialogService)
    showCardRef: DynamicDialogRef | undefined
    editRef: DynamicDialogRef | undefined

    show() {
        this.showCardRef = this.dialogService.open(AppointmentCardComponent, {
            header: 'Appointment',
            width: '50vw',
            closable: true,
        })
    }
    onEdit(data: Appointment) {
        this.editRef = this.dialogService.open(AppointmentFormComponent, {
            header: 'Update Appointment',
            data,
            closable: true,
            position: 'top',
            width: '50vw',
        })

        this.editRef.onClose.subscribe((data) => {
            console.log('data')
            //TODO: Fix it later (Murad, 10 Jan 25)
        })
    }

    delete(id: string) {
        this.appointmentApiService.deleteAppointment(id)
    }
}
