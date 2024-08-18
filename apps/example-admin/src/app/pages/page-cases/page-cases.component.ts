import { Component } from '@angular/core'

import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-page-cases',
    standalone: true,
    imports: [RouterModule, SpartanModules],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
})
export class PageCasesComponent {}
