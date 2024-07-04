import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'myorg-page-case',
    standalone: true,
    imports: [CommonModule,IonicModule],
    templateUrl: './page-case.component.html',
    styleUrl: './page-case.component.scss',
})
export class PageCaseComponent {}
