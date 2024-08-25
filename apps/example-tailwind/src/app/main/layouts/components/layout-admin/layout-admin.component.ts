import { Component } from '@angular/core'

import { SidebarAdminComponent } from '../../../sidebars/components/sidebar-admin/sidebar-admin.component'
import { HeaderAdminComponent } from '../../../headers/components/header-admin/header-admin.component'

@Component({
    selector: 'app-layout-admin',
    standalone: true,
    templateUrl: './layout-admin.component.html',
    styleUrl: './layout-admin.component.scss',
    imports: [SidebarAdminComponent, HeaderAdminComponent],
})
export class LayoutAdminComponent {}
