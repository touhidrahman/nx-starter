import { Component, inject, input, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Button } from 'primeng/button'
import { CasesStateService } from '@myorg/app-example-states'
import { AppointmentStateService } from '../../../../../../../../libs/app-example-states/src/lib/appointment-state.service'
import { Select } from 'primeng/select'
import { PrimeModules } from '@myorg/prime-modules'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-appointment-filter',
    imports: [PrimeModules, FormsModule],
    templateUrl: './appointment-filter.component.html',
    styleUrl: './appointment-filter.component.scss',
})
export class AppointmentFilterComponent {
    appointmentStateService = inject(AppointmentStateService)
    showFilter = signal(false)
    selected = signal('')

    resetFilter() {
        this.appointmentStateService.setState({
            orderBy: 'desc',
        })
        this.selected.set('')
    }

    sort() {
        const { orderBy } = this.appointmentStateService.getState()
        this.appointmentStateService.setState({
            orderBy: orderBy === 'asc' ? 'desc' : 'asc',
        })
    }
}
