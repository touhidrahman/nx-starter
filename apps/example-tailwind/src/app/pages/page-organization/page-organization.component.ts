import { Component, signal, ViewEncapsulation } from '@angular/core'
import { Button } from 'primeng/button'
import { Dialog } from 'primeng/dialog'
import { InputText } from 'primeng/inputtext'

import { Select } from 'primeng/select'

import { FormsModule } from '@angular/forms'
import { OrganizationTableComponent } from '../../features/organizaiton/components/organization-table/organization-table.component'
import { FileUpload } from 'primeng/fileupload'

@Component({
    selector: 'app-page-organization',
    imports: [
        Button,
        Dialog,
        InputText,
        Select,
        FormsModule,
        OrganizationTableComponent,
        FileUpload,
    ],
    templateUrl: './page-organization.component.html',
    styleUrl: './page-organization.component.css',
})
export class PageOrganizationComponent {
    status = ['Ordered', 'Unpaid', 'Paid', 'Confirmed', 'Cancelled']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    organizations = [
        {
            name: 'A ',
            email: 'a@example.com',
            address: 'abc',
            workHour: 5,
            totalMembers: 5,
        },
        {
            name: 'A ',
            email: 'a@example.com',
            address: 'abc',
            workHour: 5,
            totalMembers: 5,
        },
        {
            name: 'A ',
            email: 'a@example.com',
            address: 'abc',
            workHour: 5,
            totalMembers: 5,
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
