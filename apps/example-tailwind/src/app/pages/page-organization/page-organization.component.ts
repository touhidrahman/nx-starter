import { Component, inject, signal } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PrimeModules } from '@myorg/prime-modules'
import { OrganizationStateService } from '@myorg/app-example-states'
import { AsyncPipe } from '@angular/common'
import { OrganizationTableComponent } from '../../main/organization/components/organization-table/organization-table.component'
import { OrganizationFormService } from '@myorg/app-example-forms'
import { OrganizationFilterComponent } from '../../main/organization/components/organization-filter/organization-filter.component'

@Component({
    selector: 'app-page-organization',
    imports: [
        FormsModule,
        PrimeModules,
        AsyncPipe,
        OrganizationTableComponent,
        ReactiveFormsModule,
        OrganizationFilterComponent,
    ],
    templateUrl: './page-organization.component.html',
    styleUrl: './page-organization.component.css',
    providers: [OrganizationStateService, OrganizationFormService],
})
export class PageOrganizationComponent {
    organizationStateService = inject(OrganizationStateService)
    organizationFormService = inject(OrganizationFormService)
    type = ['vendor', 'client']
    status = ['active', 'inactive', 'pending']
    selected = ''
    visible = signal(false)
    editMode = signal(false)

    onSearch(value: Event) {
        this.organizationStateService.setState({
            query: (value.target as HTMLInputElement).value,
        })
    }

    openCreateOrganizationModal() {
        this.editMode.set(false)
        this.visible.set(true)
    }

    cancel() {
        this.editMode.set(false)
        this.visible.set(false)
    }

    onSave() {
        if (!this.editMode()) {
            return
        }
        this.updateOrganization()
    }

    updateOrganization() {
        const { selectedOrganization } =
            this.organizationStateService.getState()
        const formData = this.organizationFormService.getValue()
        console.log('updating organization', selectedOrganization, formData)
    }
}
