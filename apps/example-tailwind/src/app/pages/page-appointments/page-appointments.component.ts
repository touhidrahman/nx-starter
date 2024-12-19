import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-appointments',
    imports: [CommonModule, DropdownModule, FormsModule, RouterModule],
    templateUrl: './page-appointments.component.html',
    styleUrl: './page-appointments.component.scss',
})
export class PageAppointmentsComponent {
    showFilter = true

    toggleFilter() {
        this.showFilter = !this.showFilter
    }

    users = [
        {
            Date: '10/12/2024',
            ClientName: 'Ariful Hoque',
            CaseSubject: 'Contract Review',
            Location: 'F-86, Mohakhali',
            Contact: '+880110000000',
            Status: 'Open',
            Type: 'In-person',
        },
        {
            Date: '10/12/2024',
            ClientName: 'Ariful Hoque',
            CaseSubject: 'Contract Review',
            Location: 'F-86, Mohakhali',
            Contact: '+880110000000',
            Status: 'Pending',
            Type: 'In-person',
        },
        {
            Date: '10/12/2024',
            ClientName: 'Ariful Hoque',
            CaseSubject: 'Contract Review',
            Location: 'Google Meet',
            Contact: '+880110000000',
            Status: 'Closed',
            Type: 'Virtual',
        },
    ]

    tableTitles: string[] = [
        'Date',
        'Client Name',
        'Case/Subject',
        'Location',
        'Contact',
        'Status',
        'Type',
        'Action',
    ]

    setColor(value: string) {
        if (value === 'open') {
            return '#0b9c2b'
        }
        if (value === 'pending') {
            return '#9c0b0b'
        }

        return '#989898'
    }

    Options = [{ name: 'Low' }, { name: 'High' }]
    selectedOption: undefined

    popUpState = {
        visiblity: false,
        createMode: false,
    }

    showCreatePopUp() {
        this.popUpState.visiblity = true
        this.popUpState.createMode = true
    }

    showEditPopUp() {
        this.popUpState.visiblity = true
        this.popUpState.createMode = false
    }
    hidePopUp() {
        this.popUpState.visiblity = false
    }
}
