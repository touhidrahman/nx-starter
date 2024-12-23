import { Component, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule, IonModal } from '@ionic/angular'
import { CaseDateCarouselComponent } from '../../cases/case-date-carousel/case-date-carousel.component'

@Component({
    selector: 'myorg-page-cases',
    imports: [CommonModule, IonicModule, CaseDateCarouselComponent],
    templateUrl: './page-cases.component.html',
    styleUrl: './page-cases.component.scss',
})
export class PageCasesComponent {
    isModalOpen = false

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen
    }
}
