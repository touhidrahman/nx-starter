import { Component, input, model } from '@angular/core'
import { Button } from 'primeng/button'
import { TableModule } from 'primeng/table'

@Component({
    selector: 'app-client-user-list-table',
    standalone: true,
    imports: [Button, TableModule],
    templateUrl: './client-user-list-table.component.html',
    styleUrl: './client-user-list-table.component.css',
})
export class ClientUserListTableComponent {
    userList = input<any>([])

    editMode = model(false)
    visible = model(false)

    onEdit() {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }
}
