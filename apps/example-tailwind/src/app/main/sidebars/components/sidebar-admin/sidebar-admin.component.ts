import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-sidebar-admin',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './sidebar-admin.component.html',
    styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent {}
