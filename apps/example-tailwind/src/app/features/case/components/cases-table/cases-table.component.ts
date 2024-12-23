import { Component, input, model } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-cases-table',
    imports: [PrimeModules, RouterLink],
    templateUrl: './cases-table.component.html',
    styleUrl: './cases-table.component.css',
})
export class CasesTableComponent {
    cases = input<any>([])

    editMode = model(false)
    visible = model(false)

    onEdit() {
        this.visible.set(!this.visible())
        this.editMode.set(!this.editMode())
    }

    deleteCase(id: string) {
        console.log(id)
    }
}
