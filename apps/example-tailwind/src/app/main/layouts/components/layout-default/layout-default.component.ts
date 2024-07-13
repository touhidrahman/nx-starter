import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LucideAngularModule } from 'lucide-angular'
import { HeaderDefaultComponent } from '../../../headers/components/header-default/header-default.component'
import { SidebarDefaultComponent } from '../../../sidebars/components/sidebar-default/sidebar-default.component'
import { HeaderPublicComponent } from '../../../headers/components/header-public/header-public.component'

@Component({
    selector: 'app-layout-default',
    standalone: true,
    imports: [
        CommonModule,
        LucideAngularModule,
        SidebarDefaultComponent,
        HeaderDefaultComponent,
        HeaderPublicComponent,
    ],
    templateUrl: './layout-default.component.html',
    styleUrl: './layout-default.component.scss',
})
export class LayoutDefaultComponent {}
