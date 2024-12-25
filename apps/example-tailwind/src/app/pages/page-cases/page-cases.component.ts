import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CasesStateService } from '../../features/case/states/cases-state.service'
import { Button } from 'primeng/button'
import { Dialog } from 'primeng/dialog'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { CasesTableComponent } from '../../features/case/components/cases-table/cases-table.component'
import { ProgressSpinner } from 'primeng/progressspinner'
import { CaseFormService } from '../../features/case/services/case-form.service'

@Component({
    selector: 'app-page-cases',
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        RouterModule,
        Button,
        Dialog,
        InputText,
        CasesTableComponent,
        Select,
        ProgressSpinner,
        ReactiveFormsModule,
    ],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
    providers: [CaseFormService],
})
export class PageCasesComponent {
    casesStateService = inject(CasesStateService)
    caseFormService = inject(CaseFormService)

    showFilter = signal<boolean>(false)

    Options = [{ name: 'Low' }, { name: 'High' }]

    status = ['Pending', 'Accepted', 'Rejected']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    openCreateCaseModal() {
        this.editMode.set(false)
        this.visible.set(true)
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
        if (this.caseFormService.form.invalid) {
            return
        }
        const formData = this.caseFormService.getValue()
        const data = { ...formData, groupId: '1', plaintiffGroupId: '1' }
        console.log('saving Case', data)
        this.casesStateService.saveCase(data)
        this.cancel()
    }
}
