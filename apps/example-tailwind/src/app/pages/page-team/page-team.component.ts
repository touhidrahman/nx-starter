import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

interface Team {
    name: string
    email: string
    role: string
    joinDate: string
    action: string
}

@Component({
    selector: 'app-page-team',
    imports: [RouterModule, CommonModule],
    templateUrl: './page-team.component.html',
    styleUrl: './page-team.component.scss',
})
export class PageTeamComponent {
    teams: Team[] = [
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Lawyer',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Lawyer',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Lawyer',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
        {
            name: 'abcd',
            email: 'john.doe@example.com',
            role: 'Client',
            joinDate: '12/4/2025',
            action: 'Edit',
        },
    ]
}
