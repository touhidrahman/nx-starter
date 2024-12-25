import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'myorg-page-lawyer-profile',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-lawyer-profile.component.html',
    styleUrl: './page-lawyer-profile.component.scss',
})
export class PageLawyerProfileComponent implements OnInit {
    // Typically referenced to your ion-router-outlet
    presentingElement: Element | null = null

    ngOnInit() {
        this.presentingElement = document.querySelector('.ion-page')
    }
}
