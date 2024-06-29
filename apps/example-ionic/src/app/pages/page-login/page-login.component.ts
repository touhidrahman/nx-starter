import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-login',
    standalone: true,
    imports: [CommonModule,IonicModule,RouterModule],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.scss',
})
export class PageLoginComponent {}
