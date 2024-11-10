import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
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
    templateUrl: './page-admin-userlist.component.html',
    styleUrl: './page-admin-userlist.component.scss',
    providers: [provideIcons({ lucideCog, lucideTrash2, lucideSearch })],
    imports: [FormsModule, SpartanModules],
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
