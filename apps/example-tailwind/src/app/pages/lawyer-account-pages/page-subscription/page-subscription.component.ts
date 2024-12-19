import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderPublicSecondaryComponent } from '../../../main/headers/components/header-public-secondary/header-public-secondary.component'

@Component({
    selector: 'app-page-subscription',
    imports: [CommonModule, HeaderPublicSecondaryComponent],
    templateUrl: './page-subscription.component.html',
    styleUrl: './page-subscription.component.scss',
})
export class PageSubscriptionComponent {}
