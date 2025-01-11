import { Component, inject, input, model } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Button } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { OrganizationStateService } from '@myorg/app-example-states'
import { OrganizationFormService } from '@myorg/app-example-forms'
import { Organization } from '@myorg/app-example-models'

@Component({
    selector: 'app-client-table',
    imports: [CommonModule, Button, TableModule],
    templateUrl: './client-table.component.html',
    styleUrl: './client-table.component.scss',
})
export class ClientTableComponent {
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
