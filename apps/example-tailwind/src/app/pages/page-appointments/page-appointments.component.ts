import { Component, inject, OnDestroy, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { PrimeModules } from '@myorg/prime-modules'
import { AppointmentFilterComponent } from '../../main/appointment/components/appointment-filter/appointment-filter.component'
import { AppointmentTableComponent } from '../../main/appointment/components/appointment-table/appointment-table.component'
import {
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
} from 'primeng/dynamicdialog'
import { AppointmentFormComponent } from '../../main/appointment/components/appointment-form/appointment-form.component'
import { AppointmentListStateService } from '@myorg/app-example-states'
import { AppointmentEditFormService } from '@myorg/app-example-forms'

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
        AppointmentListStateService,
        DialogService,
        AppointmentEditFormService,
        DynamicDialogRef,
    ],
})
export class PageAppointmentsComponent implements OnDestroy {
    appointmentListStateService = inject(AppointmentListStateService)
    dialogService = inject(DialogService)
    ref = inject(DynamicDialogRef)
    editMode = signal(false)

    show(mode: 'create' | 'edit') {
        this.ref = this.dialogService.open(AppointmentFormComponent, {
            header: 'Create Appointment',
            data: { mode },
            width: '50vw',
            closable: true,
            position: 'top',
        })
        this.ref.onClose.subscribe((data) => {
            const { appointments } = this.appointmentListStateService.getState()
            if (mode === 'create' && data) {
                this.appointmentListStateService.setState({
                    appointments: [...appointments, data],
                })
            }
        })
    }

    onSearch(value: Event) {
        this.appointmentListStateService.setState({
            search: (value.target as HTMLInputElement).value,
        })
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close()
        }
    }
}
