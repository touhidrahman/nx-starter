import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-login',
    standalone: true,
    imports: [CommonModule,...SpartanModules,RouterModule],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
})
export class PageLoginComponent {}
