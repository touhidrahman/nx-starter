import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { HlmCardDirective } from '@spartan-ng/ui-card-helm'

@Component({
    selector: 'app-page-forgot-password',
    standalone: true,
    imports: [CommonModule, RouterModule,HlmInputDirective,HlmCardDirective],
    templateUrl: './page-forgot-password.component.html',
    styleUrl: './page-forgot-password.component.scss',
})
export class PageForgotPasswordComponent {}
