import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'
import { lucideCalendarDays, lucideMapPin } from '@ng-icons/lucide'

@Component({
    selector: 'app-page-case',
    standalone: true,
    imports: [CommonModule, ...SpartanModules,HlmIconComponent],
    templateUrl: './page-case.component.html',
    styleUrl: './page-case.component.scss',
    providers: [provideIcons({ lucideCalendarDays,lucideMapPin })],
})

export class PageCaseComponent {}
