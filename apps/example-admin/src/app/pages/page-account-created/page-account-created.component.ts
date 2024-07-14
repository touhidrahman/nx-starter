import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-account-created',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './page-account-created.component.html',
    styleUrl: './page-account-created.component.scss',
})
export class PageAccountCreatedComponent {}
