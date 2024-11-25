import { Component } from '@angular/core'
import { lucideCalendarDays, lucideMapPin } from '@ng-icons/lucide'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'

@Component({
    selector: 'app-page-case',
    standalone: true,
    imports: [HlmIconComponent],
    templateUrl: './page-case.component.html',
    styleUrl: './page-case.component.scss',
    providers: [provideIcons({ lucideCalendarDays, lucideMapPin })],
})
export class PageCaseComponent {}
