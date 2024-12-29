import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'myorg-page-appointments',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-appointments.component.html',
    styleUrl: './page-appointments.component.scss',
})
export class PageAppointmentsComponent {
    isModalOpen = false

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen
    }
}
