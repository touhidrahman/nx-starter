import { Component, inject, input, signal } from '@angular/core'
import {
    CasesStateService,
    OrganizationStateService,
} from '@myorg/app-example-states'
import { FormsModule } from '@angular/forms'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-case-filter',
    imports: [FormsModule, PrimeModules],
    templateUrl: './case-filter.component.html',
    styleUrl: './case-filter.component.scss',
    providers: [],
})
export class CaseFilterComponent {
    casesStateService = inject(CasesStateService)
    showFilter = signal(false)
    selected = signal('')

    resetFilter() {
        this.casesStateService.setState({
            orderBy: 'desc',
        })
        this.selected.set('')
    }

    sort() {
        const { orderBy } = this.casesStateService.getState()
        this.casesStateService.setState({
            orderBy: orderBy === 'asc' ? 'desc' : 'asc',
        })
    }
}
