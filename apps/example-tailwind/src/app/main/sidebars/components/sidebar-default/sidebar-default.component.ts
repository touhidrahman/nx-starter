import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'
import {
    lucideBadgeDollarSign,
    lucideCalendarDays,
    lucideCircuitBoard,
    lucideFiles,
    lucideFileSpreadsheet,
    lucideHome,
    lucideLayoutList,
    lucideListMinus,
    lucideSettings,
    lucideUsers,
} from '@ng-icons/lucide'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'

@Component({
    selector: 'app-sidebar-default',
    standalone: true,
    imports: [RouterModule, ...SpartanModules, HlmIconComponent, CommonModule],
    templateUrl: './sidebar-default.component.html',
    styleUrl: './sidebar-default.component.scss',
    providers: [
        provideIcons({
            lucideHome,
            lucideFileSpreadsheet,
            lucideUsers,
            lucideFiles,
            lucideCalendarDays,
            lucideCircuitBoard,
            lucideBadgeDollarSign,
            lucideLayoutList,
            lucideListMinus,
            lucideSettings,
        }),
    ],
})
export class SidebarDefaultComponent {
    @Input() isCollapsed = false
}
