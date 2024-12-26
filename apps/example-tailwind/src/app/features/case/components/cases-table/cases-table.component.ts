import { Component, inject, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { RouterLink } from '@angular/router'
import { CasesStateService } from '../../states/cases-state.service'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-cases-table',
    imports: [PrimeModules, RouterLink, AsyncPipe],
    templateUrl: './cases-table.component.html',
    styleUrl: './cases-table.component.css',
})
export class CasesTableComponent {
    casesStateService = inject(CasesStateService)
    cases = input<any>([])

    editMode = model(false)
    visible = model(false)

    onEdit() {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }

    pageChange(event: any) {
        //this.casesStateService.setState({page: event.page})
        this.casesStateService.setState({ size: event.rows })
    }

    deleteCase(id: string) {
        this.casesStateService.deleteCase(id)
    }
}
