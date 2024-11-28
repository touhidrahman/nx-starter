import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-sidebar-default',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './sidebar-default.component.html',
    styleUrl: './sidebar-default.component.scss',
})
export class SidebarDefaultComponent {
    @Input() isCollapsed = false
}
