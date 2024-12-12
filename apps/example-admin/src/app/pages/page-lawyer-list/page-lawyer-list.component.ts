import { Component, signal } from '@angular/core'
import { Button } from 'primeng/button'

import { Dialog } from 'primeng/dialog'
import { FloatLabel } from 'primeng/floatlabel'
import { InputText } from 'primeng/inputtext'
import { RadioButton } from 'primeng/radiobutton'
import { Select } from 'primeng/select'
import { FormsModule } from '@angular/forms'
import { LawyerListTableComponent } from '../../features/lawyer-list/components/lawyer-list-table/lawyer-list-table.component'

@Component({
    selector: 'app-page-lawyer-list',
    standalone: true,
    imports: [
        Button,
        LawyerListTableComponent,
        Dialog,
        FloatLabel,
        InputText,
        RadioButton,
        Select,
        FormsModule,
    ],
    templateUrl: './page-lawyer-list.component.html',
    styleUrl: './page-lawyer-list.component.css',
})
export class PageLawyerListComponent {
    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    lawyers = [
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

    cancel() {
        this.editMode.set(false)
        this.visible.set(false)
    }

    onSave() {
        console.log('saving organization')
    }
}
