import { CommonModule } from '@angular/common'
import { Component, signal } from '@angular/core'
import { SpartanModules } from '@my-nx-starter/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import {
    radixCaretSort,
    radixCheck,
    radixMagnifyingGlass,
} from '@ng-icons/radix-icons'

type Framework = { label: string; value: string }

@Component({
    selector: 'jsat-searchable-select',
    standalone: true,
    imports: [CommonModule, ...SpartanModules],
    templateUrl: './searchable-select.component.html',
    styleUrl: './searchable-select.component.scss',
    providers: [
        provideIcons({ radixCaretSort, radixMagnifyingGlass, radixCheck }),
    ],
})
export class SearchableSelectComponent {
    public frameworks = [
        {
            label: 'AnalogJs',
            value: 'analogjs',
        },
        {
            label: 'Angular',
            value: 'angular',
        },
        {
            label: 'Vue',
            value: 'vue',
        },
        {
            label: 'Nuxt',
            value: 'nuxt',
        },
        {
            label: 'React',
            value: 'react',
        },
        {
            label: 'NextJs',
            value: 'nextjs',
        },
    ]
    public currentFramework = signal<Framework | undefined>(undefined)
    public state = signal<'closed' | 'open'>('closed')

    stateChanged(state: 'open' | 'closed') {
        this.state.set(state)
    }

    commandSelected(framework: Framework) {
        this.state.set('closed')
        if (this.currentFramework()?.value === framework.value) {
            this.currentFramework.set(undefined)
        } else {
            this.currentFramework.set(framework)
        }
    }
}
