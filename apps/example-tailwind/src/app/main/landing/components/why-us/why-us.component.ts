import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-why-us',
    standalone: true,
    imports: [],
    templateUrl: './why-us.component.html',
    styleUrl: './why-us.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyUsComponent {}
