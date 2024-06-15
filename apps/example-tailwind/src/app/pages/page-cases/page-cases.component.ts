import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'

@Component({
    selector: 'app-page-cases',
    standalone: true,
    imports: [CommonModule,RouterModule,SpartanModules],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
})
export class PageCasesComponent {}
