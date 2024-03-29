import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-sidebar-default',
    standalone: true,
    imports: [CommonModule, RouterModule, ...SpartanModules],
    templateUrl: './sidebar-default.component.html',
    styleUrl: './sidebar-default.component.scss',
})
export class SidebarDefaultComponent {}
