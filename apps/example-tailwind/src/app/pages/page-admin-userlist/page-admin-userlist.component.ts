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
import { provideIcons } from '@ng-icons/core'
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm'
import { lucideCog, lucideSearch, lucideTrash2 } from '@ng-icons/lucide'
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm'
import {
    HlmCaptionComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
} from '@spartan-ng/ui-table-helm'
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { FormsModule } from '@angular/forms'
import { BrnRadioComponent } from '@spartan-ng/ui-radiogroup-brain'
import {
    HlmRadioDirective,
    HlmRadioIndicatorComponent,
} from '@spartan-ng/ui-radiogroup-helm'
import { BrnSelectImports } from '@spartan-ng/ui-select-brain'
import { HlmSelectImports } from '@spartan-ng/ui-select-helm'

interface User {
    firstName: string
    lastName: string
    email: string
    role: string
    signUpDate: string
    action: string
}
@Component({
    selector: 'app-page-admin-userlist',
    standalone: true,
    templateUrl: './page-admin-userlist.component.html',
    styleUrl: './page-admin-userlist.component.scss',
    providers: [provideIcons({ lucideCog, lucideTrash2, lucideSearch })],
    imports: [
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
    ],
})
export class PageAdminUserlistComponent {
    permissions = [
        {
            name: 'Case',
            read: false,
            create: false,
            edit: false,
            delete: false,
            none: false,
        },
        {
            name: 'Contact',
            read: false,
            create: false,
            edit: false,
            delete: false,
            none: false,
        },
    ]

    users: User[] = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'User',
            signUpDate: '2023-01-01',
            action: 'Edit',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Ariful',
            lastName: 'Islam',
            email: 'jane.smith@example.com',
            role: 'User',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Barack',
            lastName: 'Obama',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Donald',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
        {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            role: 'Admin',
            signUpDate: '2023-02-01',
            action: 'Edit',
        },
    ]
}
