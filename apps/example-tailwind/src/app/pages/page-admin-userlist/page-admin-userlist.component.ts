import { Component } from '@angular/core'

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
    templateUrl: './page-admin-userlist.component.html',
    styleUrl: './page-admin-userlist.component.scss',
    imports: [],
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
