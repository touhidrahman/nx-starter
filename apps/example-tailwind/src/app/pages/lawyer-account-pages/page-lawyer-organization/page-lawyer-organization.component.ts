import { Component, signal } from '@angular/core'
import { OrganizationFilterComponent } from '../../../main/organization/components/organization-filter/organization-filter.component'
import { PrimeModules } from '@myorg/prime-modules'
import { OrganizationStateService } from '@myorg/app-example-states'

@Component({
    selector: 'app-page-lawyer-organization',
    imports: [PrimeModules, OrganizationFilterComponent],
    templateUrl: './page-lawyer-organization.component.html',
    styleUrl: './page-lawyer-organization.component.scss',
    providers: [OrganizationStateService],
})
export class PageLawyerOrganizationComponent {
    status = ['active', 'inactive', 'pending']
    type = ['vendor', 'client']
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
