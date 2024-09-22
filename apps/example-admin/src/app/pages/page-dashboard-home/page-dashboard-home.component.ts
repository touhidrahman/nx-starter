import { NgClass } from '@angular/common'
import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { UserApiService } from '@myorg/app-example-api-services'
import { User } from '@myorg/app-example-models'
import { ApiResponse } from '@myorg/common-models'
import { SpartanModules } from '@myorg/spartan-modules'
import { lucideCalendarDays, lucideMapPin } from '@ng-icons/lucide'
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm'
import { LucideAngularModule } from 'lucide-angular'

@Component({
    selector: 'app-page-dashboard-home',
    standalone: true,
    imports: [
        ...SpartanModules,
        HlmIconComponent,
        NgClass,
        LucideAngularModule,
        FormsModule,
        CommonModule,
    ],
    templateUrl: './page-dashboard-home.component.html',
    styleUrls: ['./page-dashboard-home.component.scss'],
    providers: [provideIcons({ lucideCalendarDays, lucideMapPin })],
})
export class PageDashboardHomeComponent {}

