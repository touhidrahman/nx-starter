import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
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
    imports: [
        CommonModule,
        BrnDialogTriggerDirective,
        BrnDialogContentDirective,
        HlmIconComponent,

        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        HlmDialogTitleDirective,
        HlmDialogDescriptionDirective,

        HlmLabelDirective,
        HlmInputDirective,
        HlmButtonDirective,
    ],
    templateUrl: './page-admin-userlist.component.html',
    styleUrl: './page-admin-userlist.component.scss',
    providers: [provideIcons({ lucideCog, lucideTrash2, lucideSearch })],
})
export class PageAdminUserlistComponent {
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
