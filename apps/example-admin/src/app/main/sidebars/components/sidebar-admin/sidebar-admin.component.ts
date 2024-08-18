import { Component } from '@angular/core'

import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-sidebar-admin',
    standalone: true,
    imports: [RouterModule, ...SpartanModules],
    templateUrl: './sidebar-admin.component.html',
    styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent {}
