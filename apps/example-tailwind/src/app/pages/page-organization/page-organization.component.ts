import { Component, inject, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { OrganizationTableComponent } from '../../features/organizaiton/components/organization-table/organization-table.component'
import { FilterComponent } from '../../main/dashboard/components/filter/filter.component'
import { PrimeModules } from '@myorg/prime-modules'
import { OrganizationStateService } from '@myorg/app-example-states'
import { AsyncPipe } from '@angular/common'

@Component({
    selector: 'app-page-organization',
    imports: [
        FormsModule,
        OrganizationTableComponent,
        FilterComponent,
        PrimeModules,
        AsyncPipe,
    ],
    templateUrl: './page-organization.component.html',
    styleUrl: './page-organization.component.css',
    providers: [OrganizationStateService],
})
export class PageOrganizationComponent {
    organizationStateService = inject(OrganizationStateService)
    Options = [{ name: 'Low' }, { name: 'High' }]
    status = ['Pending', 'Accepted', 'Rejected']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    organizationss = [
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
