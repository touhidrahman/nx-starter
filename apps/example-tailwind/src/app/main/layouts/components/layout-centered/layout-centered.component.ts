import { Component } from '@angular/core'

import { SidebarDefaultComponent } from '../../../sidebars/components/sidebar-default/sidebar-default.component'
import { HeaderDefaultComponent } from '../../../headers/components/header-default/header-default.component'
import { HeaderPublicComponent } from '../../../headers/components/header-public/header-public.component'

@Component({
    selector: 'app-layout-centered',
    templateUrl: './layout-centered.component.html',
    styleUrl: './layout-centered.component.scss',
    imports: [
        SidebarDefaultComponent,
        HeaderDefaultComponent,
        HeaderPublicComponent,
    ]
})
export class LayoutCenteredComponent {}
