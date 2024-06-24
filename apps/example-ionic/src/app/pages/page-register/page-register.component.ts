import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-register',
    standalone: true,
    imports: [CommonModule,IonicModule,RouterModule],
    templateUrl: './page-register.component.html',
    styleUrl: './page-register.component.scss',
})
export class PageRegisterComponent {}
