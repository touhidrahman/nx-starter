import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import { lucideCombine, lucideGroup, lucideHome, lucideUsers } from '@ng-icons/lucide'

@Component({
    selector: 'app-sidebar-default',
    standalone: true,
    imports: [RouterModule, ...SpartanModules, CommonModule],
    templateUrl: './sidebar-default.component.html',
    styleUrl: './sidebar-default.component.scss',
    providers: [
        provideIcons({
            lucideHome,
            lucideUsers,
            lucideCombine,
            lucideGroup,
        }),
    ],
})
export class SidebarDefaultComponent {
    @Input() isCollapsed = false
}
