import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CasesStateService } from '../../features/case/states/cases-state.service'
import { CasesTableComponent } from '../../features/case/components/cases-table/cases-table.component'
import { CaseFormService } from '../../features/case/services/case-form.service'
import { PrimeModules } from '@myorg/prime-modules'
import { FilterComponent } from '../../main/dashboard/components/filter/filter.component'

@Component({
    selector: 'app-page-cases',
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        RouterModule,
        CasesTableComponent,
        ReactiveFormsModule,
        PrimeModules,
        FilterComponent,
    ],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
    providers: [CaseFormService],
})
export class PageCasesComponent {
    casesStateService = inject(CasesStateService)
    caseFormService = inject(CaseFormService)

    Options = [{ name: 'Low' }, { name: 'High' }]
    status = ['Pending', 'Accepted', 'Rejected']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    openCreateCaseModal() {
        this.editMode.set(false)
        this.visible.set(true)
        this.caseFormService.form.reset()
    }

    onSearch(value: Event) {
        this.casesStateService.setState({
            searchTerm: (value.target as HTMLInputElement).value,
        })
    }

    cancel() {
        this.editMode.set(false)
        this.visible.set(false)
    }

    onSave() {
        if (!this.editMode()) {
            this.create()
        }
        this.update()
    }

    create() {
        if (this.caseFormService.form.invalid) {
            return
        }
        const formData = this.caseFormService.getValue()
        const data = { ...formData, groupId: '1', plaintiffGroupId: '1' } //TODO: need to fix groupId and PlaintiffGroupId
        console.log('saving Case', data)
        this.casesStateService.saveCase(data)
        this.cancel()
    }
    update() {
        console.log('updating')
        const { selectedCase } = this.casesStateService.getState()
        const formData = this.caseFormService.getValue()
        this.casesStateService.updateCase(selectedCase?.id ?? '', formData)
        this.cancel()
    }
}
