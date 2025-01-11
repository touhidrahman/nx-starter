import { Component, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { OrganizationStateService } from '@myorg/app-example-states'
import { OrganizationFormService } from '@myorg/app-example-forms'
import {
    OrganizationStatusEnum,
    OrganizationTypeEnum,
} from '@myorg/app-example-models'
import { ClientFilterComponent } from '../../main/client/components/client-filter.component'
import { PrimeModules } from '@myorg/prime-modules'
import { ClientTableComponent } from '../../main/client/components/client-table.component'

@Component({
    selector: 'app-page-clients',
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        RouterModule,
        PrimeModules,
        ReactiveFormsModule,
        ClientFilterComponent,
        ClientTableComponent,
    ],
    templateUrl: './page-clients.component.html',
    styleUrl: './page-clients.component.scss',
    providers: [OrganizationStateService, OrganizationFormService],
})
export class PageClientsComponent {
    organizationStateService = inject(OrganizationStateService)
    organizationFormService = inject(OrganizationFormService)
    type = Object.values(OrganizationTypeEnum)
    status = Object.values(OrganizationStatusEnum)
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
