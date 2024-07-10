import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { RouterModule } from '@angular/router'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

@Component({
    selector: 'app-page-login',
    standalone: true,
    imports: [CommonModule,...SpartanModules,RouterModule,HlmInputDirective],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
})
export class PageLoginComponent {}
