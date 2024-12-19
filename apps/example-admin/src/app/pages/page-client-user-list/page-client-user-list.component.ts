import { Component, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ClientUserListTableComponent } from '../../features/client-user-list/components/client-user-list-table/client-user-list-table.component'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-page-client-client-user-list',
    imports: [ClientUserListTableComponent, FormsModule, PrimeModules],
    templateUrl: './page-client-user-list.component.html',
    styleUrl: './page-client-user-list.component.css',
})
export class PageClientUserListComponent {
    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    userList = [
        {
            firstName: 'AAA ',
            lastName: 'BBB ',
            email: 'a@example.com',
            phone: 'abc',
            role: 'user',
            signUpDate: 'date',
        },
        {
            firstName: 'AAA ',
            lastName: 'BBB ',
            email: 'a@example.com',
            phone: 'abc',
            role: 'user',
            signUpDate: 'date',
        },
        {
            firstName: 'AAA ',
            lastName: 'BBB ',
            email: 'a@example.com',
            phone: 'abc',
            role: 'user',
            signUpDate: 'date',
        },
    ]

    onSave() {
        console.log('saving organization')
    }
}
