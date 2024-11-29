import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'

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
    standalone: true,
    imports: [CommonModule, DropdownModule, FormsModule],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
})
export class PageCasesComponent {
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
}
