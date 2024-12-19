import { Component } from '@angular/core'
import { HeaderDefaultComponent } from '../../../headers/components/header-default/header-default.component'
import { SidebarDefaultComponent } from '../../../sidebars/components/sidebar-default/sidebar-default.component'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-layout-default',
    imports: [SidebarDefaultComponent, HeaderDefaultComponent, CommonModule],
    templateUrl: './layout-default.component.html',
    styleUrl: './layout-default.component.scss'
})
export class LayoutDefaultComponent {
    isSidebarCollapsed = false

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
}
