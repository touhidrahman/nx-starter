import { Component, input, model } from '@angular/core'
import { Button } from 'primeng/button'
import { TableModule } from 'primeng/table'

@Component({
    selector: 'app-organization-table',
    standalone: true,
    imports: [Button, TableModule],
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
