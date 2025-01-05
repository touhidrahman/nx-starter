import { Component, inject, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { RouterLink } from '@angular/router'
import { NgClass, NgStyle } from '@angular/common'
import { Organization } from '@myorg/app-example-models'
import { OrganizationStateService } from '@myorg/app-example-states'
import { OrganizationFormService } from '@myorg/app-example-forms'

@Component({
    selector: 'app-organization-table',
    imports: [PrimeModules, NgClass],
    templateUrl: './organization-table.component.html',
    styleUrl: './organization-table.component.css',
    providers: [OrganizationFormService],
})
export class OrganizationTableComponent {
    private organizationStateService = inject(OrganizationStateService)
    private organizationFormService = inject(OrganizationFormService)
    organizations = input<Organization[]>([])

    editMode = model(false)
    visible = model(false)

    onEdit(selectedOrganization: Organization) {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
        this.organizationFormService.form.patchValue(selectedOrganization)
        this.organizationStateService.setState({
            selectedOrganization: selectedOrganization,
        })
    }

    delete(id: string) {
        this.organizationStateService.deleteOrganization(id)
    }
}
