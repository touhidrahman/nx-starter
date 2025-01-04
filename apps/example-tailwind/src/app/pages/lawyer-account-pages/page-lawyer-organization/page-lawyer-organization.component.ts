import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { Button } from 'primeng/button'
import { Dialog } from 'primeng/dialog'
import { FileUpload } from 'primeng/fileupload'
import { FilterComponent } from '../../../main/dashboard/components/filter/filter.component'
import { InputText } from 'primeng/inputtext'
import { OrganizationTableComponent } from '../../../features/organizaiton/components/organization-table/organization-table.component'
import { ProgressSpinner } from 'primeng/progressspinner'
import { OrganizationsStore } from '../../../features/organizaiton/state/organization.state'

@Component({
    selector: 'app-page-lawyer-organization',
    imports: [
        CommonModule,
        RouterModule,
        Button,
        Dialog,
        FileUpload,
        FilterComponent,
        InputText,
        OrganizationTableComponent,
        ProgressSpinner,
    ],
    templateUrl: './page-lawyer-organization.component.html',
    styleUrl: './page-lawyer-organization.component.scss',
})
export class PageLawyerOrganizationComponent {
    store = inject(OrganizationsStore)
    Options = [{ name: 'Low' }, { name: 'High' }]
    status = ['Pending', 'Accepted', 'Rejected']
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
