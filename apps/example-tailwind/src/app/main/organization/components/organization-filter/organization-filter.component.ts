import { Component, inject, input, signal } from '@angular/core'
import { OrganizationStateService } from '@myorg/app-example-states'
import { FormsModule } from '@angular/forms'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-organization-filter',
    imports: [FormsModule, PrimeModules],
    templateUrl: './organization-filter.component.html',
    styleUrl: './organization-filter.component.css',
})
export class OrganizationFilterComponent {
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
