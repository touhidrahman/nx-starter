import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { OrganizationTableComponent } from '../../features/organizaiton/components/organization-table/organization-table.component'
import { FilterComponent } from '../../main/dashboard/components/filter/filter.component'
import { PrimeModules } from '@myorg/prime-modules'
import { OrganizationsStore } from '../../features/organizaiton/state/organization.state'

@Component({
    selector: 'app-page-organization',
    imports: [
        FormsModule,
        OrganizationTableComponent,
        FilterComponent,
        PrimeModules,
    ],
    templateUrl: './page-organization.component.html',
    styleUrl: './page-organization.component.css',
})
export class PageOrganizationComponent {
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
