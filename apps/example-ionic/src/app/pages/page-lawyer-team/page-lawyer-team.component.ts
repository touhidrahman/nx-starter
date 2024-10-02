import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-lawyer-team',
    standalone: true,
    imports: [CommonModule,IonicModule,RouterModule],
    templateUrl: './page-lawyer-team.component.html',
    styleUrl: './page-lawyer-team.component.scss',
})
export class PageLawyerTeamComponent {}
