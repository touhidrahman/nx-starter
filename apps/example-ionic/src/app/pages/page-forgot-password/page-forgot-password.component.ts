import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-forgot-password',
    imports: [CommonModule, IonicModule, RouterModule],
    templateUrl: './page-forgot-password.component.html',
    styleUrl: './page-forgot-password.component.scss'
})
export class PageForgotPasswordComponent {}
