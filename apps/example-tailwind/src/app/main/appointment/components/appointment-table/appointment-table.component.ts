import { Component, inject, input, model } from '@angular/core'
import { AsyncPipe } from '@angular/common'
import { RouterLink } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'
import { AppointmentStateService } from '../../../../../../../../libs/app-example-states/src/lib/appointment-state.service'
import { Appointment } from '@myorg/app-example-models'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AppointmentCardComponent } from '../appointment-card/appointment-card.component'
import { Footer } from 'primeng/api'
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component'

@Component({
    selector: 'app-appointment-table',
    imports: [PrimeModules, RouterLink, AsyncPipe],
    templateUrl: './appointment-table.component.html',
    styleUrl: './appointment-table.component.scss',
    providers: [AppointmentStateService],
})
export class AppointmentTableComponent {
    appointmentStateService = inject(AppointmentStateService)
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
            data,
            closable: true,
        })

        this.editRef.onClose.subscribe((data) => {
            console.log('data')
        })
    }

    delete(id: string) {
        //TODO
    }
}
