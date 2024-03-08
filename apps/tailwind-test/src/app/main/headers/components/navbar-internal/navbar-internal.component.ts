import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@my-nx-starter/spartan-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-navbar-internal',
    standalone: true,
    imports: [CommonModule, ...SpartanModules, RouterModule],
    templateUrl: './navbar-internal.component.html',
    styleUrl: './navbar-internal.component.scss',
})
export class NavbarInternalComponent {}
