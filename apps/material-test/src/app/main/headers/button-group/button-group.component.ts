import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { MaterialModules } from '@my-nx-starter/material-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-button-group',
    standalone: true,
    imports: [CommonModule, RouterModule, ...MaterialModules],
    templateUrl: './button-group.component.html',
    styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {}
