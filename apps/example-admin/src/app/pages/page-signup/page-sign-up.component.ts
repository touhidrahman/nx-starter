import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-sign-up',
    standalone: true,
    imports: [CommonModule, ...SpartanModules, RouterModule],
    templateUrl: './page-sign-up.component.html',
    styleUrl: './page-sign-up.component.scss',
})
export class PageSignUpComponent {}
