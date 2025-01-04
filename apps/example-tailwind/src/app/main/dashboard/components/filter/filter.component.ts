import { Component, input, signal } from '@angular/core'
import { PrimeModules } from '@myorg/prime-modules'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-filter',
    imports: [PrimeModules, FormsModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.css',
})
export class FilterComponent {
    showFilter = signal(false)
    status = input<string[]>([])
    Options = input<{ name: string }[]>([])
    selected = input('')

    onChangeType(event: HTMLSelectElement) {
        //TODO: Implement this method
        console.log(event)
    }
}
