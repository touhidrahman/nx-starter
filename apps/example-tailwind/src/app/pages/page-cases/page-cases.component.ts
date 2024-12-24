import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CasesStateService } from '../../features/case/states/cases-state.service'
import { Button } from 'primeng/button'
import { Dialog } from 'primeng/dialog'
import { InputText } from 'primeng/inputtext'
import { Select } from 'primeng/select'
import { CasesTableComponent } from '../../features/case/components/cases-table/cases-table.component'
import { ProgressSpinner } from 'primeng/progressspinner'

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
    ],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
})
export class PageCasesComponent {
    casesStateService = inject(CasesStateService)

    showFilter = signal<boolean>(false)

    Options = [{ name: 'Low' }, { name: 'High' }]

    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    openCreateCaseModal() {
        this.editMode.set(false)
        this.visible.set(true)
    }

    cancel() {
        this.editMode.set(false)
        this.visible.set(false)
    }

    onSave() {
        console.log('saving Case')
    }
}
