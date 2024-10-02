import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'myorg-page-client-team',
    standalone: true,
    imports: [CommonModule,RouterModule,IonicModule],
    templateUrl: './page-client-team.component.html',
    styleUrl: './page-client-team.component.scss',
})
export class PageClientTeamComponent {}
