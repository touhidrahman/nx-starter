import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-welcome1',
    standalone: true,
    imports: [CommonModule,IonicModule,RouterModule],
    templateUrl: './page-welcome1.component.html',
    styleUrl: './page-welcome1.component.scss',
})
export class PageWelcome1Component {}
