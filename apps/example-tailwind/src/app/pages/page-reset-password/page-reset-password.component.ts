import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SpartanModules } from '@myorg/spartan-modules'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'

@Component({
    selector: 'app-page-reset-password',
    standalone: true,
    imports: [CommonModule,...SpartanModules,HlmInputDirective],
    templateUrl: './page-reset-password.component.html',
    styleUrl: './page-reset-password.component.scss',
})
export class PageResetPasswordComponent {}
