import { Component, signal, ViewEncapsulation } from '@angular/core'
import { FileUpload } from 'primeng/fileupload'
import { Button } from 'primeng/button'
import { Dialog } from 'primeng/dialog'
import { UserListTableComponent } from '../../features/user-list/components/user-list-table/user-list-table.component'
import { Select } from 'primeng/select'
import { FormsModule } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'
import { FloatLabel } from 'primeng/floatlabel'
import { Table } from 'primeng/table'
import { RadioButton } from 'primeng/radiobutton'

@Component({
    selector: 'app-page-user-list',
    standalone: true,
    imports: [
        FileUpload,
        Button,
        Dialog,
        UserListTableComponent,
        Select,
        FormsModule,
        InputTextModule,
        FloatLabel,
        Table,
        RadioButton,
    ],
    templateUrl: './page-user-list.component.html',
    styleUrl: './page-user-list.component.css',
})
export class PageUserListComponent {
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

    openCreateOrganizationModal() {
        this.editMode.set(false)
        this.visible.set(true)
    }

    cancel() {
        this.editMode.set(false)
        this.visible.set(false)
    }

    onSave() {
        console.log('saving organization')
    }
}
