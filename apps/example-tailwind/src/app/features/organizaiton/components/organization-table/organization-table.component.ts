import { Component, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-organization-table',
    standalone: true,
    imports: [PrimeModules],
    templateUrl: './organization-table.component.html',
    styleUrl: './organization-table.component.css',
})
export class OrganizationTableComponent {
    organizations = input<any>([])

    editMode = model(false)
    visible = model(false)

    onEdit() {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }
}
