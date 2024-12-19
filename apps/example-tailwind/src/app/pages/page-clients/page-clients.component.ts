import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
interface Case {
    name: string
    phone: string
    email: string
    location: string
    date: string
    status: string
    caseType: string
}

@Component({
    selector: 'app-page-clients',
    imports: [CommonModule, DropdownModule, FormsModule, RouterModule],
    templateUrl: './page-clients.component.html',
    styleUrl: './page-clients.component.scss',
})
export class PageClientsComponent {
    showFilter = true

    toggleFilter() {
        this.showFilter = !this.showFilter
    }

    users: Case[] = [
        {
            name: 'Ariful Hoque',
            phone: '+88016 000 0000',
            email: 'ariful@gmail.com',
            location: 'Chittagong',
            date: '10/12/2024',
            status: 'Pending',
            caseType: 'Personal Injury',
        },
        {
            name: 'Ariful Hoque',
            phone: '+88016 000 0000',
            email: 'ariful@gmail.com',
            location: 'Chittagong',
            date: '10/12/2024',
            status: 'Open',
            caseType: 'Personal Injury',
        },
        {
            name: 'Ariful Hoque',
            phone: '+88016 000 0000',
            email: 'ariful@gmail.com',
            location: 'Chittagong',
            date: '10/12/2024',
            status: 'Closed',
            caseType: 'Personal Injury',
        },
    ]

    tableTitles: string[] = [
        'Case Name',
        'Contact',
        'Email',
        'Address',
        'Date Opened',
        'Case Status',
        'Case Type',
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
}
