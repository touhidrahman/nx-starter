import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MaterialModules } from '@my-nx-starter/material-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-header-internal',
    standalone: true,
    imports: [CommonModule, RouterModule, ...MaterialModules],
    templateUrl: './header-internal.component.html',
    styleUrl: './header-internal.component.scss',
})
export class HeaderInternalComponent {}
