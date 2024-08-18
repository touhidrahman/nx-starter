import { Component } from '@angular/core'

import { SidebarDefaultComponent } from '../../../sidebars/components/sidebar-default/sidebar-default.component'
import { HeaderDefaultComponent } from '../../../headers/components/header-default/header-default.component'

@Component({
    selector: 'app-layout-centered',
    standalone: true,
    templateUrl: './layout-centered.component.html',
    styleUrl: './layout-centered.component.scss',
    imports: [SidebarDefaultComponent, HeaderDefaultComponent],
})
export class LayoutCenteredComponent {}
