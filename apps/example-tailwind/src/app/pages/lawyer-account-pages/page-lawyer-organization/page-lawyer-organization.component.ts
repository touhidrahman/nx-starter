import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-lawyer-organization',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './page-lawyer-organization.component.html',
    styleUrl: './page-lawyer-organization.component.scss',
})
export class PageLawyerOrganizationComponent {
    tableTitles: string[] = [
        'Name',
        'Position/Role',
        'Email',
        'Phone',
        'Address',
        'Specialization',
        'Years of Experience',
        'Action',
    ]

    tableContent = [
        {
            name: 'Ariful Hoque',
            positionRole: 'Senior Partner',
            email: 'ariful@gmail.com',
            phone: '+8801100000000',
            address: 'F-86, Mohakhali',
            specialization: 'Corporate Law',
            yearsOfExperience: 15,
        },
        {
            name: 'Ariful Hoque',
            positionRole: 'Associate',
            email: 'ariful@gmail.com',
            phone: '+8801100000000',
            address: 'F-86, Mohakhali',
            specialization: 'Family Law',
            yearsOfExperience: 15,
        },
        {
            name: 'Ariful Hoque',
            positionRole: 'Office Manager',
            email: 'ariful@gmail.com',
            phone: '+8801100000000',
            address: 'F-86, Mohakhali',
            specialization: 'Office Management',
            yearsOfExperience: 15,
        },
    ]

    showInviteMemberPopUp = signal(false)

    OpenInviteMemberPopUp() {
        this.showInviteMemberPopUp.set(true)
    }
    hideInviteMemberPopUp() {
        this.showInviteMemberPopUp.set(false)
    }
}
