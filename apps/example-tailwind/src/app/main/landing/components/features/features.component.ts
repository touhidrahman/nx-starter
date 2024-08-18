import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import { lucideCheck, lucideShieldCheck } from '@ng-icons/lucide'
import { HlmInputDirective } from '@spartan-ng/ui-input-helm'
import { LucideAngularModule } from 'lucide-angular'

import { features, Features } from './feature.data'

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [LucideAngularModule, HlmInputDirective, ...SpartanModules],
    templateUrl: './features.component.html',
    styleUrl: './features.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideIcons({ lucideCheck, lucideShieldCheck })],
})
export class FeaturesComponent {
    features: Features[] = features
}
