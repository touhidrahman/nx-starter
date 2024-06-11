import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-sidebar-admin',
    standalone: true,
    imports: [CommonModule,RouterModule, ...SpartanModules],
    templateUrl: './sidebar-admin.component.html',
    styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent {}
