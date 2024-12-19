import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CasesStateService } from '../../features/case/states/cases-state.service'

interface Case {
    caseNumber: number
    caseTitle: string
    clientName: string
    courtName: string
    nextHearingDate: string
    status: string
    caseType: string
}

@Component({
    selector: 'app-page-cases',
    imports: [CommonModule, DropdownModule, FormsModule, RouterModule],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss'
})
export class PageCasesComponent {
    casesStateService = inject(CasesStateService)

    showFilter = true

    toggleFilter() {
        this.showFilter = !this.showFilter
    }

    users: Case[] = [
        {
            caseNumber: 1212121,
            caseTitle: 'Ariful vs Ferdous',
            clientName: 'Ariful Hoque',
            courtName: 'Chittagong Judge Court',
            nextHearingDate: '10/12/2024',
            status: 'Open',
            caseType: 'Personal Injury',
        },
        {
            caseNumber: 1212121,
            caseTitle: 'Ariful vs Ferdous',
            clientName: 'Ariful Hoque',
            courtName: 'Chittagong Judge Court',
            nextHearingDate: '10/12/2024',
            status: 'Pending',
            caseType: 'Personal Injury',
        },
        {
            caseNumber: 1212121,
            caseTitle: 'Ariful vs Ferdous',
            clientName: 'Ariful Hoque',
            courtName: 'Chittagong Judge Court',
            nextHearingDate: '10/12/2024',
            status: 'Closed',
            caseType: 'Personal Injury',
        },
        {
            caseNumber: 1212121,
            caseTitle: 'Ariful vs Ferdous',
            clientName: 'Ariful Hoque',
            courtName: 'Chittagong Judge Court',
            nextHearingDate: '10/12/2024',
            status: 'Pending',
            caseType: 'Personal Injury',
        },
        {
            caseNumber: 1212121,
            caseTitle: 'Ariful vs Ferdous',
            clientName: 'Ariful Hoque',
            courtName: 'Chittagong Judge Court',
            nextHearingDate: '10/12/2024',
            status: 'Open',
            caseType: 'Personal Injury',
        },
    ]

    tableTitles: string[] = [
        'Case Number',
        'Case Title',
        'Client Name',
        'Court Name',
        'Next Hearing Date',
        'Status',
        'Case Type',
        'Action',
    ]

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
    selectedOption: undefined

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
}
