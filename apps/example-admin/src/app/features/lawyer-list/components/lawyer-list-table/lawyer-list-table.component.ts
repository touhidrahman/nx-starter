import { Component, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'

@Component({
    selector: 'app-lawyer-list-table',
    imports: [PrimeModules],
    templateUrl: './lawyer-list-table.component.html',
    styleUrl: './lawyer-list-table.component.css'
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
