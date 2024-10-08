import { Component } from '@angular/core'
import { MaterialModules } from '@myorg/material-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-internal',
    standalone: true,
    imports: [RouterModule, ...MaterialModules],
    templateUrl: './header-internal.component.html',
    styleUrl: './header-internal.component.scss',
})
export class HeaderInternalComponent {}
