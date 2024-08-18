import { Component } from '@angular/core'

import { SpartanModules } from '@myorg/spartan-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-navbar-internal',
    standalone: true,
    imports: [...SpartanModules, RouterModule],
    templateUrl: './navbar-internal.component.html',
    styleUrl: './navbar-internal.component.scss',
})
export class NavbarInternalComponent {}
