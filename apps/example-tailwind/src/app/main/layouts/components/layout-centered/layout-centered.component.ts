import { Component } from '@angular/core'
import { HeaderPublicComponent } from '../../../headers/components/header-public/header-public.component'

@Component({
    selector: 'app-layout-centered',
    templateUrl: './layout-centered.component.html',
    styleUrl: './layout-centered.component.scss',
    imports: [HeaderPublicComponent],
})
export class LayoutCenteredComponent {}
