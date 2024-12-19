import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderLawyerDefaultComponent } from '../../../headers/components/header-lawyer-default/header-lawyer-default.component'
import { LawyerSidebarDefaultComponent } from '../../../sidebars/components/lawyer-sidebar-default/lawyer-sidebar-default.component'

@Component({
    selector: 'app-layout-lawyer-default',
    imports: [
        CommonModule,
        HeaderLawyerDefaultComponent,
        LawyerSidebarDefaultComponent,
    ],
    templateUrl: './layout-lawyer-default.component.html',
    styleUrl: './layout-lawyer-default.component.scss'
})
export class LayoutLawyerDefaultComponent {
    isSidebarCollapsed = true
    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed
    }
}
