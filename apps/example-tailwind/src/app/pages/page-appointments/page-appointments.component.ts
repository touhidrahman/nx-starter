import { Component, inject, OnDestroy, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { OrganizationFormService } from '@myorg/app-example-forms'
import { PrimeModules } from '@myorg/prime-modules'
import { AppointmentFilterComponent } from '../../main/appointment/components/appointment-filter/appointment-filter.component'
import { AppointmentStateService } from '../../../../../../libs/app-example-states/src/lib/appointment-state.service'
import { AppointmentTableComponent } from '../../main/appointment/components/appointment-table/appointment-table.component'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { AlertService } from '@myorg/app-example-core'
import { AppointmentFormComponent } from '../../main/appointment/components/appointment-form/appointment-form.component'

@Component({
    selector: 'app-page-appointments',
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        RouterModule,
        PrimeModules,
        ReactiveFormsModule,
        AppointmentFilterComponent,
        AppointmentTableComponent,
    ],
    templateUrl: './page-appointments.component.html',
    styleUrl: './page-appointments.component.scss',
    providers: [
        AppointmentStateService,
        OrganizationFormService,
        DialogService,
    ],
})
export class PageAppointmentsComponent implements OnDestroy {
    appointmentStateService = inject(AppointmentStateService)
    organizationFormService = inject(OrganizationFormService)
    alertService = inject(AlertService)
    dialogService = inject(DialogService)
    editMode = signal(false)

    ref: DynamicDialogRef | undefined

    show() {
        this.ref = this.dialogService.open(AppointmentFormComponent, {
            header: this.editMode()
                ? 'Update Appointment'
                : 'Create Appointment',
            closable: true,
            data: { name: 'hmmurad' },
            position: 'top',
            width: '50vw',
        })

        this.ref.onClose.subscribe((data) => {
            console.log(data)
        })
    }

    onSearch(value: Event) {
        this.appointmentStateService.setState({
            search: (value.target as HTMLInputElement).value,
        })
    }

    onSave() {
        if (!this.editMode()) {
            return
        }
        this.updateAppointment()
    }

    updateAppointment() {
        const { selectedAppointment } = this.appointmentStateService.getState()
        const formData = this.organizationFormService.getValue()
        console.log('updating organization', selectedAppointment, formData)
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
