import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-page-account-verified',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './page-account-verified.component.html',
    styleUrl: './page-account-verified.component.scss',
})
export class PageAccountVerifiedComponent {}
