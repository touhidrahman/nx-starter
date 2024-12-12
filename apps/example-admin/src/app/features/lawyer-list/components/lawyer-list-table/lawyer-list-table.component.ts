import { Component, input, model } from '@angular/core'
import { Button } from 'primeng/button'
import { TableModule } from 'primeng/table'

@Component({
    selector: 'app-lawyer-list-table',
    standalone: true,
    imports: [Button, TableModule],
    templateUrl: './lawyer-list-table.component.html',
    styleUrl: './lawyer-list-table.component.css',
})
export class LawyerListTableComponent {
    lawyers = input<any>([])

    editMode = model(false)
    visible = model(false)

    onEdit() {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }
}
