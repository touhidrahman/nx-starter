import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm'
import { BrnSelectImports } from '@spartan-ng/ui-select-brain'
import { HlmSelectImports } from '@spartan-ng/ui-select-helm'

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
    selector: 'app-page-new-cases',
    standalone: true,
    imports: [
        CommonModule,
        HlmSwitchComponent,
        BrnSelectImports,
        HlmSelectImports,
    ],
    templateUrl: './page-new-cases.component.html',
    styleUrl: './page-new-cases.component.scss',
})
export class PageNewCasesComponent {
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
}
