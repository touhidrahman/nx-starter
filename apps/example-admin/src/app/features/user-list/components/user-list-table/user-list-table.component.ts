import { Component, input, model } from '@angular/core'
import { Table } from 'primeng/table'
import { Button } from 'primeng/button'

@Component({
    selector: 'app-user-list-table',
    standalone: true,
    imports: [Table, Button],
    templateUrl: './user-list-table.component.html',
    styleUrl: './user-list-table.component.css',
})
export class UserListTableComponent {
    userList = input<any>([])

    editMode = model(false)
    visible = model(false)

    onEdit() {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }
}
