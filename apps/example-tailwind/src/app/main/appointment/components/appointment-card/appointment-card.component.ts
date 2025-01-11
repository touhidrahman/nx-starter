import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { DialogRef } from '@angular/cdk/dialog'

@Component({
    selector: 'app-appointment-card',
    imports: [CommonModule],
    templateUrl: './appointment-card.component.html',
    styleUrl: './appointment-card.component.scss',
    providers: [DialogService],
})
export class AppointmentCardComponent {}
