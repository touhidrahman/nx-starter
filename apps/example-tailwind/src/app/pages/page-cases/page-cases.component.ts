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

    setColor(value: string) {
        if (value === 'open') {
            return '#0b9c2b'
        }
        if (value === 'pending') {
            return '#9c0b0b'
        }

        return '#989898'
    }

    Options = [{ name: 'Low' }, { name: 'High' }]

    popUpState = {
        visiblity: false,
        createMode: false,
    }

    showCreatePopUp() {
        this.popUpState.visiblity = true
        this.popUpState.createMode = true
    }

    showEditPopUp() {
        this.popUpState.visiblity = true
        this.popUpState.createMode = false
    }
    hidePopUp() {
        this.popUpState.visiblity = false
    }

    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    organizations = [
        {
            name: 'A ',
            email: 'a@example.com',
            address: 'abc',
            workHour: 5,
            totalMembers: 5,
        },
        {
            name: 'A ',
            email: 'a@example.com',
            address: 'abc',
            workHour: 5,
            totalMembers: 5,
        },
        {
            name: 'A ',
            email: 'a@example.com',
            address: 'abc',
            workHour: 5,
            totalMembers: 5,
        },
    ]

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
