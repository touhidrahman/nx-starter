import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SidebarDefaultComponent } from '../../../sidebars/components/sidebar-default/sidebar-default.component'
import { HeaderDefaultComponent } from '../../../headers/components/header-default/header-default.component'

@Component({
    selector: 'app-layout-centered',
    standalone: true,
    templateUrl: './layout-centered.component.html',
    styleUrl: './layout-centered.component.scss',
    imports: [CommonModule, SidebarDefaultComponent, HeaderDefaultComponent],
})
export class LayoutCenteredComponent {}
