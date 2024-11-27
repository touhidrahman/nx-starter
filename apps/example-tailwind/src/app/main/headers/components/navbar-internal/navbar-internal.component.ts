import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-navbar-internal',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './navbar-internal.component.html',
    styleUrl: './navbar-internal.component.scss',
})
export class NavbarInternalComponent {}
