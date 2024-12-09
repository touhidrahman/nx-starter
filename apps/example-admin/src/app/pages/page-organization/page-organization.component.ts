import { Component, signal } from '@angular/core'
import { Button } from 'primeng/button'
import { Card } from 'primeng/card'
import { Select } from 'primeng/select'
import { FormsModule } from '@angular/forms'
import { IconField } from 'primeng/iconfield'
import { InputIcon } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { OrganazationTableComponent } from '../../features/organization/components/organazation-table/organazation-table.component'
import { CreateOrganizationComponent } from '../../features/organization/components/create-organization/create-organization.component'
import { Dialog } from 'primeng/dialog'
@Component({
    selector: 'app-page-organization',
    standalone: true,
    imports: [
        Button,
        Card,
        Select,
        FormsModule,
        InputIcon,
        InputTextModule,
        TableModule,
        OrganazationTableComponent,
        CreateOrganizationComponent,
        Dialog,
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
        this.visible.set(!this.visible())
    }
}
