import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@my-nx-starter/spartan-modules'

@Component({
    selector: 'jsat-sidebar-default',
    standalone: true,
    imports: [CommonModule, RouterModule, ...SpartanModules],
    templateUrl: './sidebar-default.component.html',
    styleUrl: './sidebar-default.component.scss',
})
export class SidebarDefaultComponent {}
