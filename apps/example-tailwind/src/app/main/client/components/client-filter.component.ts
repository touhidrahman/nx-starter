import { Component, inject, input, signal } from '@angular/core'
import { OrganizationStateService } from '@myorg/app-example-states'
import { PrimeModules } from '@myorg/prime-modules'
import { FormsModule } from '@angular/forms'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-client-filter',
    imports: [PrimeModules, FormsModule, AsyncPipe],
    templateUrl: './client-filter.component.html',
    styleUrl: './client-filter.component.scss',
})
export class ClientFilterComponent {
    organizationStateService = inject(OrganizationStateService)
    showFilter = signal(false)
    status = input<string[]>([])
    type = input<string[]>([])
    selected = signal('')

    onChangeType(event: string) {
        this.organizationStateService.setState({
            type: event,
        })
    }
    onChangeStatus(event: string) {
        this.organizationStateService.setState({
            status: event,
        })
    }

    resetFilter() {
        this.organizationStateService.setState({
            type: undefined,
            status: undefined,
            orderBy: 'asc',
        })
        this.selected.set('')
    }

    sort() {
        const { orderBy } = this.organizationStateService.getState()
        this.organizationStateService.setState({
            orderBy: orderBy === 'asc' ? 'desc' : 'asc',
        })
    }
}
