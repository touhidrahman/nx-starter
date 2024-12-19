import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-lawyer-sidebar-default',
    imports: [CommonModule, RouterModule],
    templateUrl: './lawyer-sidebar-default.component.html',
    styleUrl: './lawyer-sidebar-default.component.scss',
})
export class LawyerSidebarDefaultComponent {
    @Input() isCollapsed: boolean | undefined
}
