import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule, IonItem, IonRow, IonText } from '@ionic/angular'

@Component({
    selector: 'myorg-page-organizations',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-organizations.component.html',
    styleUrl: './page-organizations.component.scss',
})
export class PageOrganizationsComponent {
    isModalOpen = false

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen
    }
}
