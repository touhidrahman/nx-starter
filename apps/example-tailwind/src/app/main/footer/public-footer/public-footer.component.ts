import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-public-footer',
    imports: [],
    templateUrl: './public-footer.component.html',
    styleUrl: './public-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicFooterComponent {
    year = new Date().getFullYear()
}
