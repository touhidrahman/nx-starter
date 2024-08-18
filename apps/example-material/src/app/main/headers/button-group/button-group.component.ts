import { Component } from '@angular/core'
import { MaterialModules } from '@myorg/material-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-button-group',
    standalone: true,
    imports: [RouterModule, ...MaterialModules],
    templateUrl: './button-group.component.html',
    styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {}
