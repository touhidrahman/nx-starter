import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'app-why-us',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './why-us.component.html',
    styleUrl: './why-us.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyUsComponent {}
