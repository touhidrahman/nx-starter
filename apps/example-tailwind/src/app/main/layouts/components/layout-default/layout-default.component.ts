import { Component } from '@angular/core'
import { LucideAngularModule } from 'lucide-angular'
import { HeaderDefaultComponent } from '../../../headers/components/header-default/header-default.component'
import { SidebarDefaultComponent } from '../../../sidebars/components/sidebar-default/sidebar-default.component'
import { HeaderPublicComponent } from '../../../headers/components/header-public/header-public.component'
import { CommonModule } from '@angular/common'
import { PublicFooterComponent } from '../../../footer/public-footer/public-footer.component'

@Component({
    selector: 'app-layout-default',
    standalone: true,
    imports: [
        LucideAngularModule,
        SidebarDefaultComponent,
        HeaderDefaultComponent,
        HeaderPublicComponent,
        CommonModule,
        PublicFooterComponent,
    ],
    templateUrl: './layout-default.component.html',
    styleUrl: './layout-default.component.scss',
})
export class LayoutDefaultComponent {
    isSidebarCollapsed = false

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
}
