import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-client-team',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
    ],
    templateUrl: './page-client-team.component.html',
    styleUrl: './page-client-team.component.scss',
})
export class PageClientTeamComponent {
    teams = [
        { name: 'Team-1', value: 'team-1' },
        { name: 'Team-2', value: 'team-2' },
        { name: 'Team-3', value: 'team-3' },
        { name: 'Team-4', value: 'team-4' },
        { name: 'Team-5', value: 'team-5' },
    ]
}
