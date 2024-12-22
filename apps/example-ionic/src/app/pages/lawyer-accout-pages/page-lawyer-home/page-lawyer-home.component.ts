import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
@Component({
    selector: 'myorg-page-lawyer-home',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-lawyer-home.component.html',
    styleUrl: './page-lawyer-home.component.scss',
})
export class PageLawyerHomeComponent {
    isPopoverOpen = false
}
