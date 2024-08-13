import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-public-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './public-footer.component.html',
    styleUrl: './public-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicFooterComponent {
    year = new Date().getFullYear()
}
