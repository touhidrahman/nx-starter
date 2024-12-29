import { Component, inject, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { OrganizationsStore } from '../../state/organization.state'
import { Organization } from '../../models/organization'
import { RouterLink } from '@angular/router'
import { NgClass, NgStyle } from '@angular/common'

@Component({
    selector: 'app-organization-table',
    imports: [PrimeModules, RouterLink, NgStyle, NgClass],
    templateUrl: './organization-table.component.html',
    styleUrl: './organization-table.component.css',
})
export class OrganizationTableComponent {
    store = inject(OrganizationsStore)
    organizations = input<Organization[]>([])

    editMode = model(false)
    visible = model(false)

    onEdit(data: any) {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }

    pageChange(event: any) {
        // patchState(this.store, (state) => ({
        //     filter: {
        //         ...state.filter,
        //         size: event.rows,
        //     },
        // }));
    }

    delete(id: string) {
        // this.organizationService.delete(id).subscribe(() => {
        //     this.loadOrganizations();
        // });
    }
}
