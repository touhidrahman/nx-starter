import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CasesTableComponent } from '../../main/case/components/cases-table/cases-table.component'
import { PrimeModules } from '@myorg/prime-modules'
import { CaseFormService } from '@myorg/app-example-forms'
import { CasesStateService } from '@myorg/app-example-states'
import { AuthStateService } from '@myorg/app-example-auth'
import { CaseFilterComponent } from '../../main/case/components/case-filter/case-filter.component'

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
        CaseFilterComponent,
    ],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
    providers: [CaseFormService],
})
export class PageCasesComponent {
    casesStateService = inject(CasesStateService)
    caseFormService = inject(CaseFormService)
    authStateService = inject(AuthStateService)

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
        } else {
            this.update()
        }
    }

    create() {
        if (this.caseFormService.form.invalid) {
            return
        }
        const groupId = this.authStateService.getGroupId()
        const formData = this.caseFormService.getValue()
        const data = { ...formData, groupId, plaintiffGroupId: groupId } //TODO: need to fix groupId and
        // PlaintiffGroupId
        this.casesStateService.saveCase(data)
        this.cancel()
    }
    update() {
        const { selectedCase } = this.casesStateService.getState()
        const formData = this.caseFormService.getValue()
        this.casesStateService.updateCase(selectedCase?.id ?? '', formData)
        this.cancel()
    }
}
