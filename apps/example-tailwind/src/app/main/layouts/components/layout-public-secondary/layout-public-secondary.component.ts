import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderPublicSecondaryComponent } from '../../../headers/components/header-public-secondary/header-public-secondary.component'
import { PublicFooterComponent } from '../../../footer/public-footer/public-footer.component'

@Component({
    selector: 'app-layout-public-secondary',
    imports: [
        CommonModule,
        HeaderPublicSecondaryComponent,
        PublicFooterComponent,
    ],
    templateUrl: './layout-public-secondary.component.html',
    styleUrl: './layout-public-secondary.component.scss'
})
export class LayoutPublicSecondaryComponent {}
