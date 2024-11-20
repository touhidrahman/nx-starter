import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import {
    lucideCog,
    lucideFilter,
    lucideSearch,
    lucideTrash2,
} from '@ng-icons/lucide'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { Component } from '@angular/core'

import {
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain'
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm'
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm'
import {
    HlmCaptionComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
} from '@spartan-ng/ui-table-helm'
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm'
import { FormsModule } from '@angular/forms'
import { BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain'
import {
    HlmRadioDirective,
    HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm'
import { BrnSelectImports } from '@spartan-ng/ui-select-brain'
import { HlmSelectImports } from '@spartan-ng/ui-select-helm'
import { CommonModule } from '@angular/common'

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
        RouterModule,
        HlmButtonDirective,
        SpartanModules,
        BrnDialogTriggerDirective,
        BrnDialogContentDirective,
        HlmIconComponent,
        HlmBadgeDirective,
        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,
        HlmLabelDirective,
        HlmInputDirective,
        HlmButtonDirective,
        HlmTableComponent,
        HlmTrowComponent,
        HlmThComponent,
        HlmTdComponent,
        HlmCaptionComponent,
        HlmCheckboxComponent,
        FormsModule,
        BrnRadioComponent,
        HlmRadioIndicatorComponent,
        HlmRadioDirective,
        BrnSelectImports,
        HlmSelectImports,
        CommonModule,
    ],
    templateUrl: './page-new-cases.component.html',
    styleUrl: './page-new-cases.component.scss',
    providers: [
        provideIcons({ lucideCog, lucideFilter, lucideTrash2, lucideSearch }),
    ],
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
