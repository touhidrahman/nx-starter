import { Component, inject, signal } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { FormsModule } from '@angular/forms'
import { AppointmentListStateService } from '@myorg/app-example-states'

@Component({
    selector: 'app-appointment-filter',
    imports: [PrimeModules, FormsModule],
    templateUrl: './appointment-filter.component.html',
    styleUrl: './appointment-filter.component.scss',
})
export class AppointmentFilterComponent {
    appointmentListStateService = inject(AppointmentListStateService)
    showFilter = signal(false)
    selected = signal('')

    resetFilter() {
        this.appointmentListStateService.setState({
            orderBy: 'desc',
        })
        this.selected.set('')
    }

    sort() {
        const { orderBy } = this.appointmentListStateService.getState()
        this.appointmentListStateService.setState({
            orderBy: orderBy === 'asc' ? 'desc' : 'asc',
        })
    }
}
