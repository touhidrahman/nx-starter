import { Component, EventEmitter, inject, Output } from '@angular/core'

import { SpartanModules } from '@myorg/spartan-modules'
import { LucideAngularModule } from 'lucide-angular'
import { provideIcons } from '@ng-icons/core'
import {
    lucideAlignJustify,
    lucidePlusCircle,
    lucideSearch,
} from '@ng-icons/lucide'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-default',
    standalone: true,
    imports: [
        ...SpartanModules,
        LucideAngularModule,
        HlmInputDirective,
        RouterModule,
    ],
    templateUrl: './header-default.component.html',
    styleUrl: './header-default.component.scss',
    providers: [
        provideIcons({ lucideSearch, lucideAlignJustify, lucidePlusCircle }),
    ],
})
export class HeaderDefaultComponent {
    @Output() sidebarToggle = new EventEmitter<void>()

    toggleSidebar() {
        this.sidebarToggle.emit()
    }
}
