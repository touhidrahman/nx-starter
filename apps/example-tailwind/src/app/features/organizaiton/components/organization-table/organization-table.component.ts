import { Component, input, model } from '@angular/core'
import { Button } from 'primeng/button'
import { Table } from 'primeng/table'

@Component({
    selector: 'app-organization-table',
    standalone: true,
    imports: [Button, Table],
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
