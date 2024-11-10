import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderBlankComponent } from '../../../headers/components/header-blank/header-blank.component'

@Component({
    selector: 'app-layout-cta',
    standalone: true,
    imports: [CommonModule, HeaderBlankComponent],
    templateUrl: './layout-cta.component.html',
    styleUrl: './layout-cta.component.scss',
})
export class LayoutCtaComponent {}
