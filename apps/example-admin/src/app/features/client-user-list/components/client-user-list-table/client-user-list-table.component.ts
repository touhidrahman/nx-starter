import { Component, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-client-user-list-table',
    standalone: true,
    imports: [PrimeModules],
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
