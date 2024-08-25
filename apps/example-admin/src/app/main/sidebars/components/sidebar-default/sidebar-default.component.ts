import { Component } from '@angular/core'

import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-sidebar-default',
    standalone: true,
    imports: [RouterModule, ...SpartanModules],
    templateUrl: './sidebar-default.component.html',
    styleUrl: './sidebar-default.component.scss',
})
export class SidebarDefaultComponent {}
