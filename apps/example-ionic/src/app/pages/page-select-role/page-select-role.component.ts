import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'myorg-page-select-role',
    standalone: true,
    imports: [CommonModule,IonicModule,RouterModule],
    templateUrl: './page-select-role.component.html',
    styleUrl: './page-select-role.component.scss',
})
export class PageSelectRoleComponent {}
