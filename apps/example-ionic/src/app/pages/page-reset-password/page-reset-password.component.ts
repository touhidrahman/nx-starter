import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-reset-password',
    imports: [CommonModule, IonicModule, RouterModule],
    templateUrl: './page-reset-password.component.html',
    styleUrl: './page-reset-password.component.scss',
})
export class PageResetPasswordComponent {}
