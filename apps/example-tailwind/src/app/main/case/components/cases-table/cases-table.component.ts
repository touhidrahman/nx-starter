import { Component, inject, input, model, output } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { Router, RouterLink } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { Case } from '@myorg/app-example-models'
import { CaseFormService } from '@myorg/app-example-forms'
import { CasesStateService } from '@myorg/app-example-states'

@Component({
    selector: 'app-cases-table',
    imports: [PrimeModules, RouterLink, AsyncPipe],
    templateUrl: './cases-table.component.html',
    styleUrl: './cases-table.component.css',
})
export class CasesTableComponent {
    casesStateService = inject(CasesStateService)
    caseFormService = inject(CaseFormService)
    router = inject(Router)
    cases = input<Case[]>([])
    selectedCase = output<Case>()

    editMode = model(false)
    visible = model(false)

    onEdit(selectedCase: Case) {
        this.visible.set(true)
        this.editMode.set(true)
        this.casesStateService.setState({ selectedCase: selectedCase })
        this.caseFormService.form.patchValue(selectedCase)
    }

    pageChange(event: any) {
        //this.casesStateService.setState({page: event.page})
        this.casesStateService.setState({ size: event.rows })
    }

    deleteCase(id: string) {
        this.casesStateService.deleteCase(id)
    }
}
