import { ChangeDetectionStrategy, Component } from '@angular/core'
import { features, Features } from './feature.data'

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [],
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
    features: Features[] = features
}
