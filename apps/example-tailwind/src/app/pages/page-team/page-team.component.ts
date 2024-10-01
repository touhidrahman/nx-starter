import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import { lucideCog, lucideSearch, lucideTrash2 } from '@ng-icons/lucide'
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

interface Team {
    name: string
    email: string
    role: string
    joinDate: string
    action: string
}

@Component({
    selector: 'app-page-team',
    standalone: true,
    imports: [RouterModule,
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
        BrnSelectImports,
        HlmSelectImports,
    ],
    templateUrl: './page-team.component.html',
    styleUrl: './page-team.component.scss',
    providers: [provideIcons({ lucideCog, lucideTrash2, lucideSearch })],
})
export class PageTeamComponent {
    teams: Team[] = [
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Lawyer',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Lawyer',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Lawyer',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },

    ]
}
